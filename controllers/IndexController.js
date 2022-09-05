// 'use strict'

class IndexController {

  mensaje = (req, res) => {
    console.log('>>','IndexController','InIndex')
    res.render('index');
  }

}

module.exports = IndexController;
