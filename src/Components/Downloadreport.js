import React from "react";
import html2canvas from  'html2canvas'
import {jsPDF} from 'jspdf'

const DownloadPage = ({rootElementId,downloadFileName }) => {
    const downloadFileDocument = () => {
        const input = document.getElementById(rootElementId);
        html2canvas(input).then((canvas)=>{
        var imgData = canvas.toDataURL("image/png");
        var pdf = new jsPDF('p','pt','a4');
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData,'JPEG',0,0, pdfWidth, pdfHeight);
        pdf.save(`${downloadFileName}`)
        });
    };
    return (
        <div>
            <button onClick={downloadFileDocument} >Generate report</button>
        </div>
    )
}

export default DownloadPage;