const controller = {}

controller.landingpageView = async(req, res) => {
    res.render("landing_page")
    return 
}

controller.mainpageView = async(req, res) => {
    res.render("mainpage")
    return
}

export default controller