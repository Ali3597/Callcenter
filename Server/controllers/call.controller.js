

const {findLimitedCallsByWorkerId,countCallsByWorkerId}= require("../queries/calls.queries")
const {pageCalculator,range,titleMessage,properStringDate} = require ("./functions.controller")
const callTableFormat= ["Nom" ,"Numero" ,"date","statut","temps","action"]




exports.callsDashboard= async (req, res, next) => { 
    page = req.params.page
    skip = (10*page)-10
    workerId= req.user._id
    const [calls,callsNumbers]=await Promise.all([findLimitedCallsByWorkerId(10,skip,workerId),countCallsByWorkerId(workerId)])
    pageNumberCalls= pageCalculator(callsNumbers,10)
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