class NewsController {
  //[GET] /news
  index(req, res) {
    res.render("news");
  }

  //[GET] /news/:slug(bien dong)
  show(req, res) {
    res.send("News detail page!!!");
  }
}

module.exports = new NewsController();
