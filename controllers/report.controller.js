const {findLimitedReports,countReports} = require ("../queries/reports.queries")


const {pageCalculator,range,subMessage,properStringDate} = require ("./functions.controller")

const reportsTableFormat= ["Customer","Message" ,"Date" ,"action"]



    exports.reportsDashboard= async (req, res, next) => { 
        const [reports,reportsNumbers]=await Promise.all([findLimitedReports(10,0),countReports()])
        pageNumber= pageCalculator(reportsNumbers)
    res.render('reports/tableReports', {
        isAuthenticated: req.isAuthenticated(),
        currentUser:req.user,
        reports,
        title:"Reports",
        reportsTableFormat,
        pageNumber,
        range,
        subMessage,
        properStringDate
    } )
    }
    