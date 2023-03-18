import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  cabecera: {
    width: "100%",
    textAlign: "center",
  },
});

const PDFFile = () => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.cabecera}>
          <Text style={styles.cabecera} fixed>
            FECHA (QUE SE GENERA EL
            PAGO):_________________________________________________
          </Text>
          <br />
          <Text style={styles.cabecera} fixed>
            SE AUTORIZA LA CANTIDAD DE:
            VOLQUETES_______________TELETRAN(S)___________
          </Text>
          <br />
          <Text style={styles.cabecera} fixed>
            ORGANIZACIÓN AL QUE
            PERTENCE:____________________________________________
          </Text>
          <br />
          <Text style={styles.cabecera} fixed>
            POR CONCEPTO
            DE:________________________________________________________________
          </Text>
          <br />
          <Text style={styles.cabecera} fixed>
            PERIODO DE
            PAGO:________________________________________________________________
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
