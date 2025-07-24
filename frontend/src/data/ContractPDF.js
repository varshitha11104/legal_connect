// src/components/ContractPDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    border: '8 solid #00BFFF', // Sky blue border
    borderRadius: 10,
  },
  section: {
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 1.5,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>PAYMENT AGREEMENT</Text>

      <View style={styles.section}>
        <Text><Text style={{ fontWeight: 'bold' }}>PARTIES</Text></Text>
        <Text>
          This Payment Agreement is entered on {data.effectiveDate} between {data.debtorName} (Debtor),
          of {data.debtorAddress}, and {data.creditorName} (Creditor), of {data.creditorAddress}.
        </Text>
      </View>

      <View style={styles.section}>
        <Text><Text style={{ fontWeight: 'bold' }}>AGREEMENT</Text></Text>
        <Text>
          The Debtor agrees to pay the Creditor an amount of {data.amount}. The Parties agree to secure the debt
          by entering into an agreement for {data.debtAmount} based on the conditions below.
        </Text>
      </View>

      <View style={styles.section}>
        <Text><Text style={{ fontWeight: 'bold' }}>PAYMENT PLAN</Text></Text>
        <Text>{data.paymentPlan}</Text>
      </View>

      <View style={styles.section}>
        <Text><Text style={{ fontWeight: 'bold' }}>DEFAULT</Text></Text>
        <Text>
          If the Debtor fails to pay as agreed, the Creditor can declare the remaining amount and interest due.
        </Text>
      </View>

      <View style={styles.section}>
        <Text><Text style={{ fontWeight: 'bold' }}>GOVERNING LAW</Text></Text>
        <Text>
          This Agreement shall be governed by the laws of {data.governingLaw}.
        </Text>
      </View>
    </Page>
  </Document>
);

const ContractPDF = ({ data }) => (
  <div style={{ marginTop: '30px' }}>
    <h3>Preview PDF</h3>
    <PDFViewer width="100%" height="600">
      <MyDocument data={data} />
    </PDFViewer>
    <div style={{ marginTop: '15px' }}>
      <PDFDownloadLink
        document={<MyDocument data={data} />}
        fileName="payment-agreement.pdf"
        style={{
          padding: '10px 20px',
          backgroundColor: '#00BFFF',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
        }}
      >
        Download PDF
      </PDFDownloadLink>
    </div>
  </div>
);

export default ContractPDF;
