const {findLimitedReports,countReports,findReportAndRelatedRequestsByIdAndAuthor,deleteReportById} = require ("../queries/reports.queries")



const {pageCalculator,range,subMessage,properStringDate,urgencyColor,deadlineTimeCalcul} = require ("./functions.controller")

const reportsTableFormat= ["auteur","Message" ,"Date" ,"action"]
const requestTableFormat= ["customer","message", "type" ,"date","deadline","Niveau d'urgence ","done","Action"]



    exports.reportsDashboard= async (req, res, next) => { 
        const [reports,reportsNumbers]=await Promise.all([findLimitedReports(10,0),countReports()])
        pageNumberReports= pageCalculator(reportsNumbers)
    res.render('reports/tableReports', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        reports,
        titleReports:"Rapports",
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
        const report=await findReportAndRelatedRequestsByIdAndAuthor(reportId)
        requests= report.request
     res.render('reports/reportProfile',{
        
         report,
         requests,
         title:"Rapport",
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
    res.render('reports/tableReports', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        reports,
        titleReports:"Rapports",
        reportsTableFormat,
        pageNumberReports,
        areWeInTheReport:true,
        range,
        subMessage,
        properStringDate
    } )
    }

     
    
exports.formNewReport= async (req, res, next) => { 
    console.log(req.cookies.callerNumber)
    console.log("la"),
res.render('reports/formReports', {
    // number:req.cookies.callerNumber,
    titleForm:"Nouveau rapport",
} )
}
