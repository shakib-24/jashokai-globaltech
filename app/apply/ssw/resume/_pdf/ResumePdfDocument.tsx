import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import type { SSWApplication } from "../../_lib/types";
import {
  buildHistoryRows,
  buildQualificationRows,
  calculateAge,
  formatCurrentJapaneseDate,
  formatJapaneseDateOfBirth,
  genderLabel,
  padHistoryRows,
  padQualificationRows,
  type HistoryRow,
} from "../_lib/resumeData";

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansJP",
    fontSize: 9.5,
    color: "#1a1a1a",
    paddingTop: "12mm",
    paddingBottom: "12mm",
    paddingHorizontal: "12mm",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "4mm",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 3,
  },
  currentDate: {
    fontSize: 8.5,
    marginTop: "4mm",
  },
  photoBox: {
    width: "30mm",
    height: "40mm",
    border: "1pt solid #333333",
    justifyContent: "center",
    alignItems: "center",
  },
  photoImage: {
    width: "30mm",
    height: "40mm",
    objectFit: "cover",
  },
  photoPlaceholder: {
    fontSize: 7,
    color: "#999999",
  },
  infoBlock: {
    flexDirection: "row",
    border: "1pt solid #333333",
    marginBottom: "5mm",
  },
  infoLeft: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #333333",
  },
  infoRowNoBorder: {
    flexDirection: "row",
  },
  infoLabel: {
    width: "24mm",
    padding: "2mm",
    fontSize: 7.5,
    color: "#555555",
    borderRight: "1pt solid #333333",
    backgroundColor: "#f5f5f5",
  },
  infoValue: {
    flex: 1,
    padding: "2mm",
    fontSize: 9.5,
    justifyContent: "center",
  },
  furiganaValue: {
    fontSize: 8.5,
    color: "#444444",
  },
  nameValue: {
    fontSize: 13,
    fontWeight: "bold",
  },
  photoCell: {
    width: "32mm",
    borderLeft: "1pt solid #333333",
    padding: "1mm",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fullWidthRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #333333",
  },
  fullWidthRowLast: {
    flexDirection: "row",
  },
  table: {
    border: "1pt solid #333333",
    marginBottom: "5mm",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    borderBottom: "1pt solid #333333",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #aaaaaa",
    minHeight: "5.5mm",
  },
  yearCell: {
    width: "18mm",
    padding: "1.2mm 2mm",
    fontSize: 8.5,
    borderRight: "1pt solid #333333",
    textAlign: "center",
  },
  monthCell: {
    width: "13mm",
    padding: "1.2mm 2mm",
    fontSize: 8.5,
    borderRight: "1pt solid #333333",
    textAlign: "center",
  },
  headerCell: {
    padding: "1.5mm 2mm",
    fontSize: 8.5,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentCell: {
    flex: 1,
    padding: "1.2mm 3mm",
    fontSize: 9,
  },
  headingCell: {
    flex: 1,
    padding: "1.2mm 3mm",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  closingCell: {
    flex: 1,
    padding: "1.2mm 3mm",
    fontSize: 9,
    textAlign: "right",
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: "2mm",
    marginTop: "3mm",
  },
  textBox: {
    border: "1pt solid #333333",
    padding: "3mm",
    fontSize: 9,
    lineHeight: 1.6,
    marginBottom: "4mm",
    minHeight: "22mm",
  },
});

function InfoRow({
  label,
  value,
  valueStyle,
  noBorder,
}: {
  label: string;
  value: string;
  valueStyle?: Style;
  noBorder?: boolean;
}) {
  return (
    <View style={noBorder ? styles.infoRowNoBorder : styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueStyle ?? {}]}>{value}</Text>
    </View>
  );
}

function HistoryTableRow({ row }: { row: HistoryRow }) {
  if (row.kind === "heading") {
    return (
      <View style={styles.tableRow} wrap={false}>
        <View style={[styles.yearCell, { borderRight: "1pt solid #333333" }]} />
        <View style={[styles.monthCell, { borderRight: "1pt solid #333333" }]} />
        <Text style={styles.headingCell}>{row.text}</Text>
      </View>
    );
  }
  if (row.kind === "closing") {
    return (
      <View style={styles.tableRow} wrap={false}>
        <View style={styles.yearCell} />
        <View style={styles.monthCell} />
        <Text style={styles.closingCell}>{row.text}</Text>
      </View>
    );
  }
  return (
    <View style={styles.tableRow} wrap={false}>
      <Text style={styles.yearCell}>{row.year}</Text>
      <Text style={styles.monthCell}>{row.month}</Text>
      <Text style={styles.contentCell}>{row.text}</Text>
    </View>
  );
}

export default function ResumePdfDocument({ application }: { application: SSWApplication }) {
  const { personal } = application;
  const age = calculateAge(personal.dateOfBirth);
  const historyRows = padHistoryRows(buildHistoryRows(application));
  const qualificationRows = padQualificationRows(buildQualificationRows(application));

  return (
    <Document
      title={personal.fullName ? `履歴書_${personal.fullName}` : "履歴書"}
      author="JASHOKAI GlobalTech"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>履歴書</Text>
            <Text style={styles.currentDate}>{formatCurrentJapaneseDate()}</Text>
          </View>
        </View>

        <View style={styles.infoBlock}>
          <View style={styles.infoLeft}>
            <InfoRow label="フリガナ" value={personal.nameKatakana} valueStyle={styles.furiganaValue} />
            <InfoRow label="氏名" value={personal.fullName} valueStyle={styles.nameValue} />
            <InfoRow
              label="生年月日"
              value={
                personal.dateOfBirth
                  ? `${formatJapaneseDateOfBirth(personal.dateOfBirth)}${
                      age !== null ? `　（満 ${age} 歳）` : ""
                    }`
                  : ""
              }
            />
            <InfoRow label="性別" value={genderLabel(personal.gender)} noBorder />
          </View>
          <View style={styles.photoCell}>
            {personal.photo?.dataUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop
              <Image src={personal.photo.dataUrl} style={styles.photoImage} />
            ) : (
              <View style={styles.photoBox}>
                <Text style={styles.photoPlaceholder}>写真</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.infoBlock}>
          <View style={styles.infoLeft}>
            <InfoRow
              label="現住所"
              value={
                [personal.postalCode ? `〒${personal.postalCode}` : "", personal.currentAddress]
                  .filter(Boolean)
                  .join("\n") || ""
              }
            />
            <InfoRow label="電話" value={personal.phone} />
            <InfoRow label="E-mail" value={personal.email} noBorder />
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.headerCell, { width: "18mm", borderRight: "1pt solid #333333" }]}>
              年
            </Text>
            <Text style={[styles.headerCell, { width: "13mm", borderRight: "1pt solid #333333" }]}>
              月
            </Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>学歴・職歴</Text>
          </View>
          {historyRows.map((row, index) => (
            <HistoryTableRow key={index} row={row} />
          ))}
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.headerCell, { width: "18mm", borderRight: "1pt solid #333333" }]}>
              年
            </Text>
            <Text style={[styles.headerCell, { width: "13mm", borderRight: "1pt solid #333333" }]}>
              月
            </Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>資格・免許</Text>
          </View>
          {qualificationRows.map((row, index) => (
            <HistoryTableRow key={index} row={row} />
          ))}
        </View>

        <Text style={styles.sectionHeading}>志望理由</Text>
        <Text style={styles.textBox}>{application.motivation}</Text>

        <Text style={styles.sectionHeading}>自己PR</Text>
        <Text style={styles.textBox}>{application.selfPR}</Text>

        <Text style={styles.sectionHeading}>本人希望記入欄</Text>
        <Text style={styles.textBox}>{application.personalRequests}</Text>
      </Page>
    </Document>
  );
}
