

const {findLimitedCallsByWorkerId,countCallsByWorkerId}= require("../queries/calls.queries")
const {pageCalculator,range,titleMessage,properStringDate} = require ("./functions.controller")
const callTableFormat= ["Nom" ,"Numero" ,"date","statut","temps","action"]



exports.callsDashboard= async (req, res, next) => { 
    page = req.params.page
    skip = (5*page)-5
    workerId= req.user._id
    const [calls,callsNumbers]=await Promise.all([findLimitedCallsByWorkerId(5,skip,workerId),countCallsByWorkerId(workerId)])
    pageNumberCalls= pageCalculator(callsNumbers,5)
    titleCalls= titleMessage("calls",calls)
    console.log(calls)
res.render('calls/tableCalls', {
    page,
    currentUser:req.user,
    calls,
    titleCalls,
    callTableFormat,
    pageNumberCalls,
    range,
    properStringDate,
} )
}