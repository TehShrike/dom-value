
var dom = require('component-dom');
var value = require('../index.js');

function assert(expr) {
  if (!expr) {
    throw new Error('FAIL')
  }
}

describe('text inputs', function(){
  it('should be supported', function(){
    var el = dom('<input type="text">');
    value(el[0], 'Hello');
    assert('Hello' == el[0].value);
    assert('Hello' == value(el[0]));
  })
})

describe('textareas', function(){
  it('should be supported', function(){
    var el = dom('<textarea>');
    value(el[0], 'Hello');
    assert('Hello' == el[0].value);
    assert('Hello' == value(el[0]));
  })
})

describe('checkboxes', function(){
  it('should check when true', function(){
    var el = dom('<input type="checkbox">');
    value(el[0], true);
    assert(true === el[0].checked);
    assert(true === value(el[0]));
  })

  it('should uncheck when false', function(){
    var el = dom('<input type="checkbox" checked="checked">');
    value(el[0], false);
    assert(false === el[0].checked);
    assert(false === value(el[0]));
  })

  describe('with a value', function(){
    it('should return the value', function(){
      var el = dom('<input type="checkbox" value="accepted">');
      value(el[0], true);;
      assert('accepted' === value(el[0]));
    })
  })
})

describe('radios', function(){
  it('should check when true', function(){
    var el = dom('<input type="radio" value="a">');
    value(el[0], true);
    assert(true === el[0].checked);
    assert('a' === value(el[0]));
  })

  it('should uncheck when false', function(){
    var el = dom('<input type="radio" value="a" checked="checked">');
    value(el[0], false);
    assert(false === el[0].checked);
    assert(false === value(el[0]));
  })

  describe('with a value', function(){
    it('should return the value', function(){
      var el = dom('<input type="radio" value="a">');
      value(el[0], true);
      assert('a' === value(el[0]));
    })
  })
})

describe('radiogroups', function(){
  var els = dom('<div><input type="radio" name="group" value="a"><input type="radio" name="group" value="b"></div>').find('input');

  it('should check when value matches', function(){
    value(els, 'a');
    assert(true === els[0].checked);
    assert('a' === value(els));
  })

  it('should uncheck when false', function(){
    value(els, false);
    assert(false === els[0].checked);
    assert(false === els[1].checked);
    assert(undefined === value(els));
  })

  describe('with a value', function(){
    it('should return the value', function(){
      value(els, 'b');
      assert('b' === value(els));
    })
  })

  describe('without a value', function(){
    it('should return undefined', function(){
      value(els, false);
      assert(undefined === value(els));
    })
  })
})

describe('selects', function(){
  it('should select an option', function(){
    var el = dom('<select><option value="a"></option><option value="b"></option></select>');
    value(el[0], 'b');
    assert(true === el.find('option')[1].selected);
    assert('b' === value(el[0]));
  })

  describe('with a selected option', function(){
    it('should return the options value', function(){
      var el = dom('<select><option value="a"></option><option value="b" selected></option></select>');
      assert('b' === value(el[0]));
    })
  })

  describe('without a selected option', function(){
    it('should return the first options value', function(){
      var el = dom('<select><option value="a"></option><option value="b"></option></select>');
      assert('a' === value(el[0]));
    })
  })
})
