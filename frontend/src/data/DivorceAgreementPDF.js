import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  bold: { fontWeight: "bold" },
  section: { marginBottom: 10 },
});

const DivorceAgreementPDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>DIVORCE SETTLEMENT AGREEMENT</Text>

        <Text style={styles.section}>
          THIS AGREEMENT is made and entered into this day of{" "}
          {data.effectiveDate}, (the “Effective Date”).
        </Text>

        <Text style={styles.section}>
          <Text style={styles.bold}>1. The Parties</Text>{"\n"}
          Petitioner: {data.petitionerName}, residing at {data.petitionerAddress}{"\n"}
          Respondent: {data.respondentName}, residing at {data.respondentAddress}
        </Text>

        <Text style={styles.section}>
          <Text style={styles.bold}>2. Marriage Date</Text>{"\n"}
          The Petitioner and the Respondent were lawfully married on {data.marriageDate}, in {data.marriageCity}, County of {data.marriageCounty}, {data.marriageState}.
        </Text>

        <Text style={styles.section}>
          <Text style={styles.bold}>3. Minor Children of the Marriage</Text>
        </Text>

        {data.children.map((child, index) => (
          <Text key={index}>
            • {child.name}, born on {child.dob}
          </Text>
        ))}
      </Page>
    </Document>
  );
};

export default DivorceAgreementPDF;
