(this.webpackJsonpsellsoutweb=this.webpackJsonpsellsoutweb||[]).push([[0],{245:function(e,t,a){e.exports=a(494)},250:function(e,t,a){},251:function(e,t,a){},258:function(e,t){},260:function(e,t){},494:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(7),i=a.n(r),l=(a(250),a(251),a(228)),s=a.n(l),c=a(67),u=a(229),d=a(230),h=a(240),p=a(231),f=a(242),v=a(497),S=a(499),m=a(500),g=a(9),w=a(40),E=a(498),b=a(501),T=a(502),y=a(147),C=a.n(y),D=a(104),x=(a(254),function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).handleFileUpload=function(e){var t,n,o,r;return s.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:t=[],n=[],o=[],[],a.setState({visible:!0}),r=[],C()("%PUBLIC_URL%/EXCEL/adel.xlsx").then((function(e){console.log(e)})),C()(e.file).then((function(e){"Document Listing"!==e[0][0]&&a.setState({visible2:!0}),e.forEach((function(e){null!==e[10]&&"* Salesman"!==e[10]&&t.push(e[10])})),t=Object(c.a)(new Set(t)),a.setState({Selsman:t}),e.forEach((function(e){null!==e[8]&&"Product Description"!==e[8]&&n.push(e[8])}));var i=[];(n=Object(c.a)(new Set(n))).forEach((function(e){i.push({product:e,qty:0})})),e.forEach((function(e){null!==e[9]&&"Transaction Date"!==e[9]&&r.push(e[9])})),r=Object(c.a)(new Set(r)),a.setState({DaysToShow:r}),t.forEach((function(e){o.push({seller:e,product:i})}));var l=[],s=[],u=[],d=[],h=[];t.forEach((function(t){r.forEach((function(a){n.forEach((function(n){var o=0;e.forEach((function(e){if(e[8]===n&&e[10]===t&&e[9]===a){var r=e[25],i=e[18];"EA"===e[26]||"DS"===e[26]?o+=r/i:o+=r/i*i,u.push(e[1]),d.push({code:e[1],nomDuClient:e[2]})}})),u=Object(c.a)(new Set(u)),d=Object(c.a)(new Set(d));var r=u.length;u=[],l.push({produit:n,qty:o,ActiveCoverge:r,ListClient:d}),d=[]})),h.push({Day:a,Product:l}),l=[]})),s.push({Seller:t,Days:h}),h=[]})),a.setState({Total:s});var p=a.state.Total[0].Seller;a.setState({SellerToShow:p}),r=a.state.Total[0].Days,a.setState({DataToShow:r});var f=a.state.DataToShow[0].Product;f.sort((function(e,t){return e.produit<t.produit?-1:e.produit>t.produit?1:0})),a.setState({DispProd:f,downloadBtn:!1});var v=a.state.Total,S=[];n.forEach((function(e){S.push({Product:e,qty:0,ActiveCoverge:0})}));v.forEach((function(e){e.Days.forEach((function(e){e.Product.forEach((function(e){var t=S.findIndex((function(t){return t.Product===e.produit}));S[t].qty+=e.qty,S[t].ActiveCoverge+=e.ActiveCoverge}))}))})),a.setState({TotalDepot:S}),a.setState({visible:!1})}));case 8:case"end":return i.stop()}}))},a.callback=function(e){var t=a.state.Total,n=t.findIndex((function(t){return t.Seller===e})),o=t[n].Seller;a.setState({SellerToShow:o});var r=a.state.Total[n].Days;a.setState({DataToShow:r})},a.callback2=function(e){var t=a.state.DataToShow,n=t.findIndex((function(t){return t.Day===e})),o=t[n].Product;o.sort((function(e,t){return e.produit<t.produit?-1:e.produit>t.produit?1:0})),a.setState({DispProd:o,downloadBtn:!1})},a.getClient=function(e){var t=new Date,n=String(t.getDate()).padStart(2,"0"),o=String(t.getMonth()+1).padStart(2,"0"),r=t.getFullYear();t=o+"/"+n+"/"+r;var i={fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,showTitle:!0,filename:e.produit+"_"+a.state.SellerToShow,title:e.produit+"/ "+t,useTextFile:!1,useBom:!0,useKeysAsHeaders:!0};new D.ExportToCsv(i).generateCsv(e.ListClient)},a.getActiveCoverge=function(){var e={fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,showTitle:!0,filename:a.state.SellerToShow,title:a.state.SellerToShow,useTextFile:!1,useBom:!0,useKeysAsHeaders:!0};new D.ExportToCsv(e).generateCsv(a.state.DispProd)},a.getActiveCovergeDepot=function(){new D.ExportToCsv({fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,showTitle:!0,filename:"Active Coverge Depot",title:"Active Coverge Depot",useTextFile:!1,useBom:!0,useKeysAsHeaders:!0}).generateCsv(a.state.TotalDepot)},a.state={Selsman:[],Total:[],DaysToShow:[],DispProd:[],SellerToShow:[],DataToShow:[],downloadBtn:!0,TotalDepot:[],visible:!1,visible2:!1},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=(v.a.Header,v.a.Footer,v.a.Sider,v.a.Content),a=S.a.Dragger,n=m.a.TabPane;return o.a.createElement(o.a.Fragment,null,o.a.createElement(v.a,null,o.a.createElement(t,null,o.a.createElement(a,{name:"file",onChange:function(t){e.handleFileUpload(t)},beforeUpload:function(){return!1},accept:".xlsx"},o.a.createElement("p",{className:"ant-upload-drag-icon"},o.a.createElement(g.a,{type:"inbox"})),o.a.createElement("p",{className:"ant-upload-text"},"Appuier ici ou deplacer le fichier ici"),o.a.createElement("p",{className:"ant-upload-hint"}))),o.a.createElement(m.a,{defaultActiveKey:"1",onChange:this.callback},this.state.Selsman.map((function(e){return o.a.createElement(n,{tab:e,key:e})}))),o.a.createElement(m.a,{defaultActiveKey:"1",onChange:this.callback2},this.state.DaysToShow.map((function(e){return o.a.createElement(n,{tab:e,key:e})}))),o.a.createElement(v.a,null,o.a.createElement(t,null,o.a.createElement(w.a,{type:"primary",icon:"download",size:"large",onClick:this.getActiveCoverge,disabled:this.state.downloadBtn},"Telecharger l'active coverge"),o.a.createElement(w.a,{type:"primary",icon:"download",size:"large",onClick:this.getActiveCovergeDepot,disabled:this.state.downloadBtn},"Telecharger l'active coverge depot"))),o.a.createElement(E.a,{columns:[{title:"Product",dataIndex:"produit",sorter:!0,key:"produit"},{title:"Quantity",dataIndex:"qty",key:"qty"},{title:"Active Coverge",dataIndex:"ActiveCoverge",key:"ActiveCoverge"}],dataSource:this.state.DispProd,onRow:function(t){return{onClick:function(){e.getClient(t)}}}}),o.a.createElement(b.a,{title:"En cours de Traitement",visible:this.state.visible},o.a.createElement(T.a,{title:"Le fichier est en cours d'execution Veuillez patienter"})),o.a.createElement(b.a,{title:"En cours de Traitement",visible:this.state.visible2,onOk:function(){e.setState({visible2:!1})},onCancel:function(){e.setState({visible2:!1})}},o.a.createElement(T.a,{status:"error",title:"Fichier invalide",subTitle:"Veuillez ne pas modifier le fichier Document Listing il suffis seulement de autoriser les modification apres le telechargement veuillez contacter Mr Sofiane Khoudour "}))))}}]),t}(n.Component));var A=function(){return o.a.createElement(x,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[245,1,2]]]);
//# sourceMappingURL=main.51ab71cb.chunk.js.map