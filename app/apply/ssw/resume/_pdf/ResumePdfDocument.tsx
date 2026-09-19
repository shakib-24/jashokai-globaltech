import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { SSWApplication } from "../../_lib/types";
import {
  buildHistoryRows,
  buildPersonalRequestsText,
  buildQualificationRows,
  calculateAge,
  cleanText,
  formatCurrentJapaneseDate,
  formatJapaneseDateOfBirth,
  formatJapanesePhone,
  genderLabel,
  padHistoryRows,
  padQualificationRows,
  withPdfLineBreaks,
  type HistoryRow,
} from "../_lib/resumeData";

const BLACK = "#000000";
const border = `1pt solid ${BLACK}`;

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansJP",
    fontSize: 9.5,
    color: "#000000",
    backgroundColor: "#ffffff",
    paddingTop: "12mm",
    paddingBottom: "12mm",
    paddingHorizontal: "12mm",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "5mm",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 4,
  },
  currentDate: {
    fontSize: 8.5,
    marginTop: "4mm",
    color: "#333333",
  },

  // Top block: フリガナ / 氏名 / 生年月日・性別 + photo
  topBlock: {
    flexDirection: "row",
    border,
  },
  topLeftCol: {
    flex: 1,
    flexDirection: "column",
  },
  topRow: {
    flexDirection: "row",
    borderBottom: border,
  },
  topRowLast: {
    flexDirection: "row",
  },
  topLabel: {
    width: "24mm",
    padding: "2mm",
    fontSize: 7.5,
    color: "#555555",
    borderRight: border,
  },
  furiganaValue: {
    flex: 1,
    padding: "2mm",
    fontSize: 8.5,
    color: "#333333",
    justifyContent: "center",
  },
  nameRow: {
    minHeight: "18mm",
  },
  nameValue: {
    flex: 1,
    padding: "2mm 3mm",
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
  },
  dobRow: {
    minHeight: "14mm",
  },
  dobValue: {
    flex: 1,
    padding: "2mm",
    fontSize: 9.5,
    justifyContent: "center",
  },
  genderLabel: {
    width: "13mm",
    padding: "2mm",
    fontSize: 7.5,
    color: "#555555",
    borderLeft: border,
    justifyContent: "center",
    textAlign: "center",
  },
  genderValue: {
    width: "15mm",
    padding: "2mm",
    fontSize: 11,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  photoCell: {
    width: "34mm",
    borderLeft: border,
    padding: "1.5mm",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  photoBox: {
    width: "30mm",
    height: "40mm",
    border,
    justifyContent: "center",
    alignItems: "center",
  },
  photoImage: {
    width: "30mm",
    height: "40mm",
    objectFit: "cover",
    border,
  },
  photoPlaceholder: {
    fontSize: 7,
    color: "#999999",
    textAlign: "center",
  },

  // Address block: フリガナ (address) / 現住所 + 電話・E-mail column
  addressBlock: {
    border,
    marginTop: "3mm",
  },
  addressFuriganaRow: {
    flexDirection: "row",
    borderBottom: border,
    minHeight: "6mm",
  },
  addressBody: {
    flexDirection: "row",
    minHeight: "24mm",
  },
  addressLeft: {
    flex: 1,
    flexDirection: "column",
  },
  addressLabel: {
    fontSize: 7.5,
    color: "#555555",
    borderBottom: border,
    padding: "1.5mm 2mm 0.5mm 2mm",
  },
  addressValue: {
    flex: 1,
    padding: "1.5mm 3mm",
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  contactCol: {
    width: "42mm",
    borderLeft: border,
    flexDirection: "column",
  },
  contactCell: {
    flex: 1,
    borderBottom: border,
    padding: "1.5mm 2mm",
    justifyContent: "center",
  },
  contactCellLast: {
    flex: 1,
    padding: "1.5mm 2mm",
    justifyContent: "center",
  },
  contactLabel: {
    fontSize: 7.5,
    color: "#555555",
  },
  contactValue: {
    fontSize: 9,
    marginTop: "0.5mm",
    overflow: "hidden",
  },

  // 連絡先 (alternate contact) block
  altContactBlock: {
    border,
    marginTop: "3mm",
  },
  altContactHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    borderBottom: border,
    backgroundColor: "#f0f0f0",
    padding: "1mm 2mm",
  },
  altContactHeading: {
    fontSize: 9,
    fontWeight: "bold",
  },
  altContactNote: {
    fontSize: 6.5,
    color: "#555555",
    marginLeft: "2mm",
  },
  altContactValue: {
    fontSize: 9.5,
    padding: "2mm",
    minHeight: "8mm",
  },

  table: {
    border,
    marginTop: "4mm",
    marginBottom: "4mm",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottom: border,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #999999",
    minHeight: "5.5mm",
  },
  yearCell: {
    width: "18mm",
    padding: "1.2mm 2mm",
    fontSize: 8.5,
    borderRight: border,
    textAlign: "center",
  },
  monthCell: {
    width: "13mm",
    padding: "1.2mm 2mm",
    fontSize: 8.5,
    borderRight: border,
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

  // Heading-in-box sections: 志望理由 / 自己PR / 本人希望記入欄
  headingBox: {
    border,
    marginBottom: "4mm",
  },
  headingBoxHeader: {
    borderBottom: border,
    backgroundColor: "#f0f0f0",
    padding: "1.5mm 3mm",
  },
  headingBoxTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
  },
  headingBoxNote: {
    fontSize: 6.5,
    color: "#555555",
    marginTop: "0.5mm",
  },
  headingBoxContent: {
    padding: "3mm",
    fontSize: 9,
    lineHeight: 1.6,
    minHeight: "22mm",
  },

  // 本人希望記入欄: bordered row grid instead of one open text box
  requestRow: {
    borderBottom: "0.5pt solid #999999",
    padding: "1.8mm 3mm",
    fontSize: 9,
    minHeight: "6.5mm",
  },
  requestRowLast: {
    padding: "1.8mm 3mm",
    fontSize: 9,
    minHeight: "6.5mm",
  },
});

function HistoryTableRow({ row }: { row: HistoryRow }) {
  if (row.kind === "heading") {
    return (
      <View style={styles.tableRow} wrap={false}>
        <View style={styles.yearCell} />
        <View style={styles.monthCell} />
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

function HistoryTable({ title, rows }: { title: string; rows: HistoryRow[] }) {
  return (
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.headerCell, { width: "18mm", borderRight: border }]}>年</Text>
        <Text style={[styles.headerCell, { width: "13mm", borderRight: border }]}>月</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>{title}</Text>
      </View>
      {rows.map((row, index) => (
        <HistoryTableRow key={index} row={row} />
      ))}
    </View>
  );
}

function HeadingBox({ heading, note, text }: { heading: string; note?: string; text: string }) {
  return (
    <View style={styles.headingBox}>
      <View style={styles.headingBoxHeader}>
        <Text style={styles.headingBoxTitle}>{heading}</Text>
        {note && <Text style={styles.headingBoxNote}>{note}</Text>}
      </View>
      <Text style={styles.headingBoxContent}>{text}</Text>
    </View>
  );
}

const REQUEST_GRID_ROWS = 5;

function RequestGridBox({ heading, note, text }: { heading: string; note?: string; text: string }) {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  const rows = Array.from({ length: REQUEST_GRID_ROWS }, (_, i) => lines[i] ?? "");

  return (
    <View style={styles.headingBox}>
      <View style={styles.headingBoxHeader}>
        <Text style={styles.headingBoxTitle}>{heading}</Text>
        {note && <Text style={styles.headingBoxNote}>{note}</Text>}
      </View>
      {rows.map((line, index) => (
        <Text
          key={index}
          style={index < rows.length - 1 ? styles.requestRow : styles.requestRowLast}
        >
          {line}
        </Text>
      ))}
    </View>
  );
}

export default function ResumePdfDocument({ application }: { application: SSWApplication }) {
  const { personal } = application;
  const age = calculateAge(personal.dateOfBirth);
  const historyRows = padHistoryRows(buildHistoryRows(application));
  const qualificationRows = padQualificationRows(buildQualificationRows(application), 6);

  return (
    <Document
      title={personal.fullName ? `履歴書_${personal.fullName}` : "履歴書"}
      author="JASHOKAI GlobalTech"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerRow}>
          <Text style={styles.title}>履歴書</Text>
          <Text style={styles.currentDate}>{formatCurrentJapaneseDate()}</Text>
        </View>

        <View style={styles.topBlock}>
          <View style={styles.topLeftCol}>
            <View style={styles.topRow}>
              <Text style={styles.topLabel}>フリガナ</Text>
              <Text style={styles.furiganaValue}>{personal.nameKatakana}</Text>
            </View>
            <View style={[styles.topRow, styles.nameRow]}>
              <Text style={styles.topLabel}>氏　名</Text>
              <Text style={styles.nameValue}>{personal.fullName}</Text>
            </View>
            <View style={[styles.topRowLast, styles.dobRow]}>
              <Text style={styles.topLabel}>生年月日</Text>
              <Text style={styles.dobValue}>
                {personal.dateOfBirth
                  ? `${formatJapaneseDateOfBirth(personal.dateOfBirth)}${
                      age !== null ? `　（満 ${age} 歳）` : ""
                    }`
                  : ""}
              </Text>
              <Text style={styles.genderLabel}>性別</Text>
              <Text style={styles.genderValue}>{genderLabel(personal.gender)}</Text>
            </View>
          </View>
          <View style={styles.photoCell}>
            {personal.photo?.dataUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop
              <Image src={personal.photo.dataUrl} style={styles.photoImage} />
            ) : (
              <View style={styles.photoBox}>
                <Text style={styles.photoPlaceholder}>写真{"\n"}4cm×3cm</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.addressBlock}>
          <View style={styles.addressFuriganaRow}>
            <Text style={styles.topLabel}>フリガナ</Text>
            {/* Address furigana isn't collected by the application form yet — intentionally left blank rather than derived. */}
            <View style={{ flex: 1 }} />
          </View>
          <View style={styles.addressBody}>
            <View style={styles.addressLeft}>
              <Text style={styles.addressLabel}>現住所</Text>
              <Text style={styles.addressValue}>
                {[personal.postalCode ? `〒${personal.postalCode}` : "", personal.currentAddress]
                  .filter(Boolean)
                  .join("\n") || ""}
              </Text>
            </View>
            <View style={styles.contactCol}>
              <View style={styles.contactCell}>
                <Text style={styles.contactLabel}>電話</Text>
                <Text style={styles.contactValue}>{formatJapanesePhone(personal.phone)}</Text>
              </View>
              <View style={styles.contactCellLast}>
                <Text style={styles.contactLabel}>E-mail</Text>
                <Text style={styles.contactValue}>{withPdfLineBreaks(personal.email)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.altContactBlock}>
          <View style={styles.altContactHeaderRow}>
            <Text style={styles.altContactHeading}>連絡先</Text>
            <Text style={styles.altContactNote}>（現住所以外に連絡を希望する場合のみ記入）</Text>
          </View>
          <Text style={styles.altContactValue}>同上</Text>
        </View>

        <HistoryTable title="学歴・職歴" rows={historyRows} />
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <HistoryTable title="資格・免許" rows={qualificationRows} />

        <HeadingBox heading="志望理由" text={cleanText(application.motivation)} />
        <HeadingBox heading="自己PR" text={cleanText(application.selfPR)} />
        <RequestGridBox
          heading="本人希望記入欄"
          note="（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）"
          text={buildPersonalRequestsText(application)}
        />
      </Page>
    </Document>
  );
}
