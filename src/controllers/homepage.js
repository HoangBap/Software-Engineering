const controller = {}

controller.landingpageView = async(req, res) => {
    res.render("landing_page")
    return 
}

controller.mainpageView = async(req, res) => {
    res.render("mainpage")
    return
}

controller.viewBMI = async (req, res) => {
    res.render('bmi')
    return 
}

controller.viewHealthMonitor = async (req, res) => {
    res.render('health_monitoring')
}

export default controller