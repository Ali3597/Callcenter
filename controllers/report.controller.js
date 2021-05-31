const {findLimitedReports,countReports} = require ("../queries/reports.queries")


const {pageCalculator,range,subMessage,properStringDate} = require ("./functions.controller")

const reportsTableFormat= ["auteur","Customer","Message" ,"Date" ,"action"]



    exports.reportsDashboard= async (req, res, next) => { 
        const [reports,reportsNumbers]=await Promise.all([findLimitedReports(10,0),countReports()])
        pageNumberReports= pageCalculator(reportsNumbers)
    res.render('reports/tableReports', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        reports,
        title:"Reports",
        reportsTableFormat,
        pageNumberReports,
        areWeInTheReport:true,
        range,
        subMessage,
        properStringDate
    } )
    }
    