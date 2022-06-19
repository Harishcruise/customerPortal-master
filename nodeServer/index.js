const express = require('express')
const bodyParser= require('body-parser');
const unirest=require('unirest');
const cors=require('cors');
// const request =require('request');
const app= express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept");
   next();
});
app.listen(port,()=>{
    console.log("running");
})
app.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/login900421')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_LOG xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><I_CUSTID>'+ username +'</I_CUSTID><I_PASSWORD>'+ password +'</I_PASSWORD></ns0:ZFM_CP_LOG>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.post('/profile',(req,res)=>{
    var username = req.body.username;
    // var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/profile900421')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_PROFILE xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><CUSTID>'+ username +'</CUSTID></ns0:ZFM_CP_PROFILE>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.post('/delivery',(req,res)=>{
    var username = req.body.username;
    // var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/delivery900421')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_DELI xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><CUSTID>'+ username +'</CUSTID><IT_DELIVERY><item><VBELN/><ERZET/><ERDAT/><VKORG/><LFART/><LFDAT_V/><INCO2/><ARKTX/><LFUHR/></item></IT_DELIVERY></ns0:ZFM_CP_DELI>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.post('/sale',(req,res)=>{
    var username = req.body.username;
    // var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/sale900421')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_SALES xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><I_CUSID>'+ username +'</I_CUSID><I_DOCDATE_FROM/><I_DOCDATE_TO/><I_EXMATNR><MATERIAL_EXT/><MATERIAL_VERS/><MATERIAL_GUID/></I_EXMATNR><I_MATNR/><I_PURORDER/><I_PURORDER_NUM/><I_SALESORG/></ns0:ZFM_CP_SALES>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.post('/pay',(req,res)=>{
    var username = req.body.username;
    // var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/pay900421')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_PAYAGING xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><I_COMCODE/><I_CUSID>'+ username +'</I_CUSID><I_DOCDATE/><IT_DET><item><COMP_CODE/><CUSTOMER/><SP_GL_IND/><CLEAR_DATE/><CLR_DOC_NO/><ALLOC_NMBR/><FISC_YEAR/><DOC_NO/><ITEM_NUM/><PSTNG_DATE/><DOC_DATE/><ENTRY_DATE/><CURRENCY/><LOC_CURRCY/>REF_DOC_NO/><DOC_TYPE/><FIS_PERIOD/><POST_KEY/><DB_CR_IND/><BUS_AREA/><TAX_CODE/><LC_AMOUNT/><AMT_DOCCUR/><LC_TAX/><TX_DOC_CUR/><ITEM_TEXT/><BRANCH/><BLINE_DATE/><PMNTTRMS/><DSCT_DAYS1/><DSCT_DAYS2/><NETTERMS/><DSCT_PCT1/><DSCT_PCT2/><DISC_BASE/><DSC_AMT_LC/><DSC_AMT_DC/><PYMT_METH/><PMNT_BLOCK/><FIXEDTERMS/><INV_REF/><INV_YEAR/><INV_ITEM/><DUNN_BLOCK/><DUNN_KEY/><LAST_DUNN/><DUNN_LEVEL/><DUNN_AREA/><DOC_STATUS/><NXT_DOCTYP/><VAT_REG_NO/><REASON_CDE/><PMTMTHSUPL/><REF_KEY_1/><REF_KEY_2/><T_CURRENCY/><AMOUNT/><NET_AMOUNT/><NAME/><NAME_2/><NAME_3/><NAME_4/><POSTL_CODE/><CITY/><COUNTRY/><STREET/><PO_BOX/><POBX_PCD/><POBK_CURAC/> <BANK_ACCT/><BANK_KEY/><BANK_CTRY/><TAX_NO_1/><TAX_NO_2/><TAX/><EQUAL_TAX/><REGION/><CTRL_KEY/><INSTR_KEY/><PAYEE_CODE/><LANGU/><BILL_LIFE/><BE_TAXCODE/><BILLTAX_LC/><BILLTAX_FC/><LC_COL_CHG/><COLL_CHARG/><CHGS_TX_CD/><ISSUE_DATE/><USAGEDATE/><BILL_USAGE/><DOMICILE/><DRAWER/><CTRBNK_LOC/> <DRAW_CITY1/><DRAWEE/><DRAW_CITY2/><DISCT_DAYS/><DISCT_RATE/><ACCEPTED/><BILLSTATUS/><PRTEST_IND/><BE_DEMAND/><OBJ_TYPE/><REF_DOC/><REF_ORG_UN/><REVERSAL_DOC/><SP_GL_TYPE/><NEG_POSTNG/><REF_DOC_NO_LONG/><BILL_DOC/></item></IT_DET></ns0:ZFM_CP_PAYAGING>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.post('/credit',(req,res)=>{
    var username = req.body.username;
    // var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/cpcreditmemosan396')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_CREDITMEMO_SAN xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><I_CUSID>'+ username +'</I_CUSID><IT_CRE><item><KUNNR/><MATNR/><WERKS/><MENGE/><MEINS/><BUKRS/><BELNR/><GJAHR/><BUZEI/><AUGDT/><KOART/><DMBTR/><BDIFF/><XBILK/></item></IT_CRE><IT_DEB><item><KUNNR/><MATNR/><WERKS/><MENGE/><MEINS/><BUKRS/><BELNR/><GJAHR/><BUZEI/><AUGDT/><KOART/><DMBTR/><BDIFF/><XBILK/></item></IT_DEB></ns0:ZFM_CP_CREDITMEMO_SAN>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.post('/inquiry',(req,res)=>{
    var username = req.body.username;
    // var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/cpinquirysan396')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_CUS_INQ_SAN xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><CUSID>'+ username +'</CUSID><INQ_DET><item><VBELN/><ERDAT/><ERNAM/><ANGDT/><BNDDT/><AUDAT/><GUEBG/><GUEEN/><VDATU/><AUTLF/></item></INQ_DET></ns0:ZFM_CP_CUS_INQ_SAN>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.post('/invoice',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/cpinvoicesan396')
    .header({
        'Authorization':'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
        'Context-Type':'application/json'
    })
    .send('<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_CP_INV_SAN xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><CUS_ID>'+ username +'</CUS_ID><SALES_DOC_NO>'+ password +'</SALES_DOC_NO><INV_DET><item><MANDT/><BUKRS/><BELNR/><GJAHR/><BUZEI/><BUZID/><AUGDT/><AUGCP/><AUGBL/><BSCHL/><KOART/><UMSKZ/><UMSKS/><ZUMSK/><SHKZG/><GSBER/><PARGB/><MWSKZ/><QSSKZ/><DMBTR/><WRBTR/><KZBTR/><PSWBT/><PSWSL/><TXBHW/><TXBFW/><MWSTS/><WMWST/><HWBAS/><FWBAS/><HWZUZ/><FWZUZ/><SHZUZ/><STEKZ/><MWART/><TXGRP/><KTOSL/><QSSHB/><KURSR/><GBETR/><BDIFF/><BDIF2/><VALUT/><ZUONR/><SGTXT/><ZINKZ/><VBUND/><BEWAR/><ALTKT/><VORGN/><FDLEV/><FDGRP/><FDWBT/><FDTAG/><FKONT/><KOKRS/><KOSTL/><PROJN/><AUFNR/><VBELN/><VBEL2/><POSN2/><ETEN2/><ANLN1/><ANLN2/><ANBWA/><BZDAT/><PERNR/><XUMSW/><XHRES/><XKRES/><XOPVW/><XCPDD/><XSKST/><XSAUF/><XSPRO/><XSERG/><XFAKT/><XUMAN/><XANET/><XSKRL/><XINVE/><XPANZ/><XAUTO/><XNCOP/><XZAHL/><SAKNR/><HKONT/><KUNNR/><LIFNR/><FILKD/><XBILK/><GVTYP/><HZUON/><ZFBDT/><ZTERM/><ZBD1T/><ZBD2T/><ZBD3T/><ZBD1P/><ZBD2P/><SKFBT/><SKNTO/><WSKTO/><ZLSCH/><ZLSPR/><ZBFIX/><HBKID/><BVTYP/><NEBTR/><MWSK1/><DMBT1/><WRBT1/><MWSK2/><DMBT2/><WRBT2/><MWSK3/><DMBT3/><WRBT3/><REBZG/><REBZJ/><REBZZ/><REBZT/><ZOLLT/><ZOLLD/><LZBKZ/><LANDL/><DIEKZ/><SAMNR/><ABPER/><VRSKZ/><VRSDT/><DISBN/><DISBJ/><DISBZ/><WVERW/><ANFBN/><ANFBJ/><ANFBU/><ANFAE/><BLNBT/><BLNKZ/><BLNPZ/><MSCHL/><MANSP/><MADAT/><MANST/><MABER/><ESRNR/><ESRRE/><ESRPZ/><KLIBT/><QSZNR/><QBSHB/><QSFBT/><NAVHW/><NAVFW/><MATNR/><WERKS/><MENGE/><MEINS/><ERFMG/><ERFME/><BPMNG/><BPRME/><EBELN/><EBELP/><ZEKKN/><ELIKZ/><VPRSV/><PEINH/><BWKEY/><BWTAR/><BUSTW/><REWRT/><REWWR/><BONFB/><BUALT/><PSALT/><NPREI/><TBTKZ/><SPGRP/><SPGRM/><SPGRT/><SPGRG/><SPGRV/><SPGRQ/><STCEG/><EGBLD/><EGLLD/><RSTGR/><RYACQ/><RPACQ/><RDIFF/><RDIF2/><PRCTR/><XHKOM/><VNAME/><RECID/><EGRUP/><VPTNR/><VERTT/><VERTN/><VBEWA/><DEPOT/><TXJCD/><IMKEY/><DABRZ/><POPTS/><FIPOS/><KSTRG/><NPLNR/><AUFPL/><APLZL/><PROJK/><PAOBJNR/><PASUBNR/><SPGRS/><SPGRC/><BTYPE/><ETYPE/><XEGDR/><LNRAN/><HRKFT/><DMBE2/><DMBE3/><DMB21/><DMB22/><DMB23/><DMB31/><DMB32/><DMB33/><MWST2/><MWST3/><NAVH2/><NAVH3/><SKNT2/><SKNT3/><BDIF3/><RDIF3/><HWMET/><GLUPM/><XRAGL/><UZAWE/><LOKKT/><FISTL/><GEBER/><STBUK/><TXBH2/><TXBH3/><PPRCT/><XREF1/><XREF2/><KBLNR/><KBLPOS/><STTAX/><FKBER/><OBZEI/><XNEGP/><RFZEI/><CCBTC/><KKBER/><EMPFB/><XREF3/><DTWS1/><DTWS2/><DTWS3/><DTWS4/><GRICD/><GRIRG/><GITYP/><XPYPR/><KIDNO/><ABSBT/><IDXSP/><LINFV/><KONTT/><KONTL/><TXDAT/><AGZEI/><PYCUR/><PYAMT/><BUPLA/><SECCO/><LSTAR/><CESSION_KZ/><PRZNR/><PPDIFF/><PPDIF2/><PPDIF3/><PENLC1/><PENLC2/><PENLC3/><PENFC/><PENDAYS/><PENRC/><GRANT_NBR/><SCTAX/><FKBER_LONG/><GMVKZ/><SRTYPE/><INTRENO/><MEASURE/><AUGGJ/><PPA_EX_IND/><DOCLN/><SEGMENT/><PSEGMENT/><PFKBER/><HKTID/><KSTAR/><XLGCLR/><TAXPS/><PAYS_PROV/><PAYS_TRAN/><MNDID/><XFRGE_BSEG/><SQUAN/><RE_BUKRS/><RE_ACCOUNT/><PGEBER/><PGRANT_NBR/><BUDGET_PD/><PBUDGET_PD/><J_1TPBUPL/><PEROP_BEG/><PEROP_END/><FASTPAY/><IGNR_IVREF/><FMFGUS_KEY/><FMXDOCNR/><FMXYEAR/><FMXDOCLN/><FMXZEKKN/><PRODPER/><RECRF/></item></INV_DET></ns0:ZFM_CP_INV_SAN>')   
    .end(function(result){
        if(result.error){
            console.log(result.error);
        }
        else{
            this.res = result.body;
            console.log(this.res);
        }
        res.json(result.body);
        console.log(res);
    } )
})
app.get('/login',(req,res)=>{
    res.send("hi")
})