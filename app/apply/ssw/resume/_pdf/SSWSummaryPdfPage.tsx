import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { SSWInfo } from "../../_lib/types";
import { buildSSWSummaryRows } from "../_lib/resumeData";

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansJP",
    fontSize: 9.5,
    color: "#1a1a1a",
    paddingTop: "14mm",
    paddingBottom: "14mm",
    paddingHorizontal: "14mm",
  },
  eyebrow: {
    fontSize: 8,
    fontWeight: "bold",
    letterSpacing: 1.5,
    color: "#c89b3c",
    marginBottom: "2mm",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a1f44",
    marginBottom: "2mm",
  },
  subtitle: {
    fontSize: 8.5,
    color: "#5b6472",
    marginBottom: "8mm",
  },
  table: {
    border: "1pt solid #0a1f44",
  },
  row: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #cbd5e1",
  },
  rowLast: {
    flexDirection: "row",
  },
  label: {
    width: "60mm",
    padding: "3mm",
    fontSize: 9,
    fontWeight: "bold",
    color: "#0a1f44",
    backgroundColor: "#f5f5f5",
    borderRight: "1pt solid #0a1f44",
  },
  value: {
    flex: 1,
    padding: "3mm",
    fontSize: 9.5,
    color: "#1a1a1a",
  },
});

export default function SSWSummaryPdfPage({ ssw }: { ssw: SSWInfo }) {
  const rows = buildSSWSummaryRows(ssw);

  return (
    <Page size="A4" style={styles.page} wrap>
      <Text style={styles.eyebrow}>JASHOKAI GLOBALTECH</Text>
      <Text style={styles.title}>SSW Application Summary</Text>
      <Text style={styles.subtitle}>
        These SSW-specific details are for internal reference and are not part of the
        traditional 履歴書 document.
      </Text>

      <View style={styles.table}>
        {rows.map((row, index) => (
          <View key={row.label} style={index === rows.length - 1 ? styles.rowLast : styles.row}>
            <Text style={styles.label}>{row.label}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
}
