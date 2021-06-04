const {findLimitedReports,countReports,findReportAndRelatedRequestsByIdAndAuthor,deleteReportById,createReport,findLimitedReportsByRequestsId,countReportsByRequestId} = require ("../queries/reports.queries")

const {findRequestById,findRequestByIdWithCustomersAssociate}= require ("../queries/requests.queries")

const {pageCalculator,range,subMessage,properStringDate,urgencyColor,deadlineTimeCalcul,titleMessage,titleMessageOn} = require ("./functions.controller")

const reportsTableFormat= ["auteur","Message" ,"Date" ,"action"]
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]

    exports.reportsDashboard= async (req, res, next) => { 
        const [reports,reportsNumbers]=await Promise.all([findLimitedReports(10,0),countReports()])
        pageNumberReports= pageCalculator(reportsNumbers)
        titleReports= titleMessage("reports", reports)
    res.render('reports/tableReports', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        reports,
        titleReports,
        reportsTableFormat,
        pageNumberReports,
        areWeInTheReport:true,
        range,
        subMessage,
        properStringDate
    } )
    }


    exports.reportProfile= async (req, res, next) => { 
        const  reportId=  req.params.reportId;
        const report= await findReportAndRelatedRequestsByIdAndAuthor(reportId)
        requests= report.request
     res.render('reports/reportProfile',{
         report,
         requests,
         titleRequests:"Requetes relié a ce rapport",
         pageNumberReports,
         requestTableFormat,
         subMessage,
         range,
         properStringDate,
         urgencyColor,
         deadlineTimeCalcul
     } )
     }

     exports.deleteReport= async (req, res, next) => { 
        const  reportId=  req.params.reportId;
        await deleteReportById(reportId)
        const [reports,reportsNumbers]=await Promise.all([findLimitedReports(10,0),countReports()])
        pageNumberReports= pageCalculator(reportsNumbers)
        titleReports= titleMessage("reports", reports)
    res.render('reports/tableReports', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        reports,
        titleReports,
        reportsTableFormat,
        pageNumberReports,
        areWeInTheReport:true,
        range,
        subMessage,
        properStringDate
    } )
    }

     
    
exports.formNewReport= async (req, res, next) => { 
    selectedRequestId=req.body.item
    selectedRequest=  await findRequestById(selectedRequestId)
res.render('reports/formReports', {
    selectedRequest,
    titleForm:"Nouveau rapport",
} )
}




exports.newReport=  async (req, res, next) => {
   
    currentUserId= req.user.id

    reportArray =req.body.arrayValue
    requestId = reportArray[0];
    await createReport(reportArray,currentUserId)
    const [request,reports,reportsNumbers]=await Promise.all([
            findRequestByIdWithCustomersAssociate(requestId),
            findLimitedReportsByRequestsId(5,0,requestId),
            countReportsByRequestId(requestId)],)
            pageNumberReports= pageCalculator(reportsNumbers,5)

         res.render('requests/requestProfile',{
            profile:true,
             request,
             reports, 
             titleReports:"Rapport concernant la requete",
             pageNumberReports,
             reportsTableFormat,
             subMessage,
             deadlineTimeCalcul,
             urgencyColor,
             range,
             properStringDate,
         } )
         
        }

      



        exports.searchReports= async (req, res, next) => { 
            const [reports,reportsNumbers]=await Promise.all([findLimitedReports(10,0),countReports()])
            pageNumberReports= pageCalculator(reportsNumbers)
            titleReports= titleMessage("reports", reports)
        res.render('reports/tableReports', {
            isAuthenticated: req.isAuthenticated(),
            currentUser:req.user,
            reports,
            titleReports,
            reportsTableFormat,
            pageNumberReports,
            areWeInTheReport:true,
            range,
            subMessage,
            properStringDate
        } )
        }
    
        

         

        