var chai = require('chai')
global.expect = chai.expect
var matchers = require('./matchers')
chai.use(matchers)
var util = require('./testUtils')
global.__ = util.__
global.sequence = util.sequence

