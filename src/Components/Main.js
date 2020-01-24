import React, { Component } from "react";
import { Upload, Icon, Layout, Tabs, Table, Button, Modal, Result } from "antd";
import readXlsxFile from "read-excel-file/node";
import { ExportToCsv } from "export-to-csv";

import "antd/dist/antd.css";
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Selsman: [],
      Total: [],
      DaysToShow: [],
      DispProd: [],
      SellerToShow: [],
      DataToShow: [],
      downloadBtn: true,
      TotalDepot: [],
      visible: false,
      visible2: false
    };
  }
  handleFileUpload = async info => {
    let Selsman = [];
    let Products = [];
    let TotalSells = [];
    let tempProduct = [];
    this.setState({ visible: true });
    let Days = [];
    readXlsxFile("%PUBLIC_URL%/EXCEL/adel.xlsx").then(rows => {
      console.log(rows);
    });
    readXlsxFile(info.file).then(rows => {
      if (rows[0][0] !== "Document Listing") {
        this.setState({ visible2: true });
      }
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

      rows.forEach(row => {
        if (row[9] !== null && row[9] !== "Transaction Date") {
          Days.push(row[9]);
        }
      });
      Days = [...new Set(Days)];
      this.setState({ DaysToShow: Days });

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
      let Daily = [];
      Selsman.forEach(seller => {
        Days.forEach(day => {
          Products.forEach(product => {
            let k = 0;
            rows.forEach(row => {
              if (row[8] === product && row[10] === seller && row[9] === day) {
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
          Daily.push({ Day: day, Product: tempProduct });

          tempProduct = [];
        });
        TempTot.push({
          Seller: seller,
          Days: Daily
        });
        Daily = [];
      });

      this.setState({ Total: TempTot });
      let temp1 = this.state.Total[0].Seller;
      this.setState({ SellerToShow: temp1 });
      Days = this.state.Total[0].Days;
      this.setState({ DataToShow: Days });
      let temp = this.state.DataToShow;
      let prod = temp[0].Product;
      prod.sort(function(a, b) {
        if (a.produit < b.produit) {
          return -1;
        }
        if (a.produit > b.produit) {
          return 1;
        }
        return 0;
      });
      this.setState({ DispProd: prod, downloadBtn: false });

      let tempTotal = this.state.Total;
      let nnProduct = [];
      Products.forEach(product => {
        nnProduct.push({ Product: product, qty: 0, ActiveCoverge: 0 });
      });
      let tempTotalDepot = [];

      tempTotal.forEach(seller => {
        seller.Days.forEach(day => {
          day.Product.forEach(prod => {
            let index = nnProduct.findIndex(
              elem => elem.Product === prod.produit
            );

            nnProduct[index].qty += prod.qty;
            nnProduct[index].ActiveCoverge += prod.ActiveCoverge;
          });
        });
      });
      this.setState({ TotalDepot: nnProduct });
      this.setState({ visible: false });
    });
  };
  callback = key => {
    let temp = this.state.Total;
    let index = temp.findIndex(elem => elem.Seller === key);
    let seller = temp[index].Seller;
    this.setState({ SellerToShow: seller });
    let Days = this.state.Total[index].Days;
    this.setState({ DataToShow: Days });
  };

  callback2 = key => {
    let temp = this.state.DataToShow;
    let index = temp.findIndex(elem => elem.Day === key);

    let prod = temp[index].Product;
    prod.sort(function(a, b) {
      if (a.produit < b.produit) {
        return -1;
      }
      if (a.produit > b.produit) {
        return 1;
      }
      return 0;
    });
    this.setState({ DispProd: prod, downloadBtn: false });
  };
  getClient = data => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      filename: data.produit + "_" + this.state.SellerToShow,
      title: data.produit + "/ " + today,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data.ListClient);
  };
  getActiveCoverge = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      filename: this.state.SellerToShow,
      title: this.state.SellerToShow,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.state.DispProd);
  };
  getActiveCovergeDepot = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      filename: "Active Coverge Depot",
      title: "Active Coverge Depot",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.state.TotalDepot);
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
              accept=".xlsx"
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
          <Tabs defaultActiveKey="1" onChange={this.callback2}>
            {this.state.DaysToShow.map(i => (
              <TabPane tab={i} key={i}></TabPane>
            ))}
          </Tabs>
          <Layout>
            <Content>
              <Button
                type="primary"
                icon="download"
                size="large"
                onClick={this.getActiveCoverge}
                disabled={this.state.downloadBtn}
              >
                Telecharger l'active coverge
              </Button>
              <Button
                type="primary"
                icon="download"
                size="large"
                onClick={this.getActiveCovergeDepot}
                disabled={this.state.downloadBtn}
              >
                Telecharger l'active coverge depot
              </Button>
            </Content>
          </Layout>
          <Table
            columns={columns}
            dataSource={this.state.DispProd}
            onRow={record => ({
              onClick: () => {
                this.getClient(record);
              }
            })}
          />
          <Modal title="En cours de Traitement" visible={this.state.visible}>
            <Result title="Le fichier est en cours d'execution Veuillez patienter" />
          </Modal>
          <Modal
            title="En cours de Traitement"
            visible={this.state.visible2}
            onOk={() => {
              this.setState({ visible2: false });
            }}
            onCancel={() => {
              this.setState({ visible2: false });
            }}
          >
            <Result
              status="error"
              title="Fichier invalide"
              subTitle="Veuillez ne pas modifier le fichier Document Listing il suffis seulement de autoriser les modification apres le telechargement veuillez contacter Mr Sofiane Khoudour "
            ></Result>
          </Modal>
        </Layout>
      </>
    );
  }
}
