import React, { Component } from "react";
import { Upload, Icon, Layout, Tabs, Table, Button } from "antd";
import readXlsxFile from "read-excel-file";
import XLSX from "xlsx";
import ReactExport from "react-export-excel";
import { ExportToCsv } from "export-to-csv";

import "antd/dist/antd.css";
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Selsman: [],
      Total: [],
      DispProd: []
    };
  }
  handleFileUpload = async info => {
    let Selsman = [];
    let Products = [];
    let TotalSells = [];
    let tempProduct = [];
    readXlsxFile(info.file).then(rows => {
      rows.forEach(row => {
        if (row[10] !== null && row[10] !== "* Salesman") {
          Selsman.push(row[10]);
        }
      });
      Selsman = [...new Set(Selsman)];
      this.setState({ Selsman: Selsman });
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

      /**   rows.forEach(row => {
        TotalSells.forEach(data => {
          if (data.seller === row[10]) {
            data.product.forEach(produit => {
              let k = 0;
              if (produit.product === row[8] && data.seller === row[10]) {
                let qty = row[25];
                let conversion = row[18];
                k = k + qty / conversion;
                produit.qty = k;
              }
            });
          }
        });
      });
      */
      let tempProduct = [];
      let TempTot = [];
      let tempClient = [];
      let Clients = [];
      Selsman.forEach(seller => {
        Products.forEach(product => {
          let k = 0;
          rows.forEach(row => {
            if (row[8] === product && row[10] === seller) {
              let qty = row[25];
              let conversion = row[18];
              if (row[26] === "EA" || row[26] === "DS") {
                k = k + qty / conversion;
              } else {
                k = k + (qty / conversion) * conversion;
              }

              tempClient.push(row[1]);
              Clients.push({ code: row[1], nomDuClient: row[2] });
            }
          });
          tempClient = [...new Set(tempClient)];
          Clients = [...new Set(Clients)];
          let NbrClient = tempClient.length;
          tempClient = [];
          tempProduct.push({
            produit: product,
            qty: k,
            ActiveCoverge: NbrClient,
            ListClient: Clients
          });
          Clients = [];
        });
        TempTot.push({
          Seller: seller,
          Product: tempProduct
        });
        tempProduct = [];
      });

      this.setState({ Total: TempTot });
    });
  };
  callback = key => {
    let temp = this.state.Total;
    let index = temp.findIndex(elem => elem.Seller === key);
    let prod = this.state.Total[index].Product;
    this.setState({ DispProd: prod });
  };
  s2ab = s => {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf); //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
    return buf;
  };
  download = (url, name) => {
    let a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();

    window.URL.revokeObjectURL(url);
  };
  getClient = data => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    console.log(data);
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: data.produit + "/ " + today,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data.ListClient);
  };
  render() {
    const { Header, Footer, Sider, Content } = Layout;

    const { Dragger } = Upload;
    const { TabPane } = Tabs;
    const columns = [
      {
        title: "Product",
        dataIndex: "produit",
        sorter: true,
        key: "produit"
      },
      {
        title: "Quantity",
        dataIndex: "qty",
        key: "qty"
      },
      {
        title: "Active Coverge",
        dataIndex: "ActiveCoverge",
        key: "ActiveCoverge"
      }
    ];

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
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            {this.state.Selsman.map(i => (
              <TabPane tab={i} key={i}></TabPane>
            ))}
          </Tabs>
          <Table
            columns={columns}
            dataSource={this.state.DispProd}
            onRow={record => ({
              onClick: () => {
                this.getClient(record);
              }
            })}
          />
        </Layout>
      </>
    );
  }
}
