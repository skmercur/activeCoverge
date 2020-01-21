import React, { Component } from "react";
import { Upload, Icon, Layout } from "antd";
import readXlsxFile from "read-excel-file";
import "antd/dist/antd.css";
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  handleFileUpload = async info => {
    let Selsman = [];
    let Products = [];
    let TotalSells = [];
    let tempProduct = [];
    readXlsxFile(info.file).then(rows => {
      console.log(rows);
      rows.forEach(row => {
        if (row[10] !== null && row[10] !== "* Salesman") {
          Selsman.push(row[10]);
        }
      });
      Selsman = [...new Set(Selsman)];
      rows.forEach(row => {
        if (row[8] !== null && row[8] !== "Product Description") {
          Products.push(row[8]);
        }
      });
      let newProd = [];

      Products = [...new Set(Products)];
      Products.forEach(product => {
        newProd.push({ product: product, qty: 0 });
      });
      Selsman.forEach(seller => {
        TotalSells.push({
          seller: seller,
          product: newProd
        });
      });
      console.log(TotalSells);

      rows.forEach(row => {
        TotalSells.forEach(data => {
          data.product.forEach(produit => {
            let k = 0;
            if (produit.product === row[8] && data.seller === row[10]) {
              let qty = row[25];
              let conversion = row[18];
              k = k + qty / conversion;
              produit.qty = k;
            }
          });
        });
      });
      console.log(TotalSells);
    });
  };
  render() {
    const { Header, Footer, Sider, Content } = Layout;

    const { Dragger } = Upload;
    return (
      <>
        <Layout>
          <Content>
            <Dragger
              name="file"
              onChange={e => {
                this.handleFileUpload(e);
              }}
              beforeUpload={() => {
                return false;
              }}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Appuier ici ou deplacer le fichier ici
              </p>
              <p className="ant-upload-hint"></p>
            </Dragger>
          </Content>
        </Layout>
      </>
    );
  }
}
