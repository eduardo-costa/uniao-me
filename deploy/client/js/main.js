(function () { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
var XmlType = { __ename__ : true, __constructs__ : [] };
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
};
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
};
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
};
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
};
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
};
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
};
Xml.prototype = {
	get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n1 = this.x[k1];
				k1++;
				if(n1.nodeType == Xml.Element && n1._nodeName == name) {
					this.cur = k1;
					return n1;
				}
			}
			return null;
		}};
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,__class__: Xml
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe.io.Bytes
};
haxe.crypto = {};
haxe.crypto.Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe.crypto.Base64;
haxe.crypto.Base64.__name__ = ["haxe","crypto","Base64"];
haxe.crypto.Base64.encode = function(bytes,complement) {
	if(complement == null) complement = true;
	var str = new haxe.crypto.BaseCode(haxe.crypto.Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		var _g1 = 0;
		var _g = (3 - bytes.length * 4 % 3) % 3;
		while(_g1 < _g) {
			var i = _g1++;
			str += "=";
		}
	}
	return str;
};
haxe.crypto.Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe.crypto.BaseCode(haxe.crypto.Base64.BYTES).decodeBytes(haxe.io.Bytes.ofString(str));
};
haxe.crypto.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe.crypto.BaseCode;
haxe.crypto.BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe.crypto.BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe.io.Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.get(pin++);
			}
			curbits -= nbits;
			out.set(pout++,base.b[buf >> curbits & mask]);
		}
		if(curbits > 0) out.set(pout++,base.b[buf << nbits - curbits & mask]);
		return out;
	}
	,initTable: function() {
		var tbl = new Array();
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe.io.Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw "BaseCode : invalid encoded char";
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe.crypto.BaseCode
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe.ds.StringMap
};
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; return $x; };
haxe.xml = {};
haxe.xml.Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
};
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i;
					if(s.charCodeAt(1) == 120) i = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else i = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.add(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else buf.add(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
};
var haxor = {};
haxor.core = {};
haxor.core.IDisposable = function() { };
$hxClasses["haxor.core.IDisposable"] = haxor.core.IDisposable;
haxor.core.IDisposable.__name__ = ["haxor","core","IDisposable"];
haxor.core.IDisposable.prototype = {
	__class__: haxor.core.IDisposable
};
haxor.core.Resource = function(p_name) {
	if(p_name == null) p_name = "";
	this.m_uid = haxor.context.EngineContext.uid++;
	this.m_destroyed = false;
	this.__cid = 0;
	this.__db = "";
	this.__pid = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
	this.m_name = p_name;
	this.m_is_behaviour = js.Boot.__instanceof(this,haxor.component.Behaviour);
	this.m_type_class = Type.getClass(this);
	this.m_type_full_name = Type.getClassName(this.m_type_class);
	var nt = this.m_type_full_name.split(".");
	nt.reverse();
	this.m_type_name = nt[0];
	if(p_name == "") this.m_name = this.m_type_name + this.m_uid; else this.m_name = p_name;
	this.m_guid = "";
	this.m_guid += StringTools.hex(Math.floor(268435455 * Math.random()));
	this.m_guid += StringTools.hex(Math.floor(268435455 * Math.random()));
	this.m_guid += StringTools.hex(Math.floor(268435455 * Math.random()));
	this.m_guid += StringTools.hex(Math.floor(268435455 * Math.random()));
	haxor.context.EngineContext.resources.Add(this);
};
$hxClasses["haxor.core.Resource"] = haxor.core.Resource;
haxor.core.Resource.__name__ = ["haxor","core","Resource"];
haxor.core.Resource.__interfaces__ = [haxor.core.IDisposable];
haxor.core.Resource.Destroy = function(p_target) {
	if(p_target.__db != "") haxor.io.file.Asset.Remove(p_target.__db);
	haxor.context.EngineContext.Destroy(p_target);
};
haxor.core.Resource.prototype = {
	get_application: function() {
		return haxor.core.BaseApplication.m_instance;
	}
	,get_guid: function() {
		return this.m_guid;
	}
	,get_uid: function() {
		return this.m_uid;
	}
	,get_name: function() {
		return this.m_name;
	}
	,set_name: function(v) {
		this.m_name = v;
		return v;
	}
	,get_destroyed: function() {
		return this.m_destroyed;
	}
	,GetType: function() {
		return this.m_type_class;
	}
	,GetTypeName: function() {
		return this.m_type_name;
	}
	,GetTypeFullName: function() {
		return this.m_type_full_name;
	}
	,OnDestroy: function() {
	}
	,__class__: haxor.core.Resource
};
haxor.component = {};
haxor.component.Component = function(p_name) {
	haxor.core.Resource.call(this,p_name);
};
$hxClasses["haxor.component.Component"] = haxor.component.Component;
haxor.component.Component.__name__ = ["haxor","component","Component"];
haxor.component.Component.__super__ = haxor.core.Resource;
haxor.component.Component.prototype = $extend(haxor.core.Resource.prototype,{
	get_name: function() {
		return this.m_entity.get_name();
	}
	,set_name: function(v) {
		this.m_entity.set_name(v);
		return v;
	}
	,get_entity: function() {
		return this.m_entity;
	}
	,get_transform: function() {
		return this.m_entity.m_transform;
	}
	,AddComponent: function(p_type) {
		return this.m_entity.AddComponent(p_type);
	}
	,GetComponent: function(p_type) {
		return this.m_entity.GetComponent(p_type);
	}
	,GetComponents: function(p_type) {
		return this.m_entity.GetComponents(p_type);
	}
	,GetComponentInChildren: function(p_type) {
		return this.m_entity.GetComponentInChildren(p_type);
	}
	,GetComponentsInChildren: function(p_type) {
		return this.m_entity.GetComponentsInChildren(p_type);
	}
	,OnBuild: function() {
	}
	,OnTransformUpdate: function() {
	}
	,OnVisibilityChange: function(p_visible) {
	}
	,__class__: haxor.component.Component
});
haxor.component.Behaviour = function(p_name) {
	haxor.component.Component.call(this,p_name);
};
$hxClasses["haxor.component.Behaviour"] = haxor.component.Behaviour;
haxor.component.Behaviour.__name__ = ["haxor","component","Behaviour"];
haxor.component.Behaviour.__super__ = haxor.component.Component;
haxor.component.Behaviour.prototype = $extend(haxor.component.Component.prototype,{
	get_enabled: function() {
		return this.m_enabled && !this.m_destroyed;
	}
	,set_enabled: function(v) {
		if(this.m_destroyed) return false;
		if(this.m_enabled == v) return v;
		this.m_enabled = v;
		if(v) haxor.context.EngineContext.Enable(this); else haxor.context.EngineContext.Disable(this);
		return v;
	}
	,OnBuild: function() {
		haxor.component.Component.prototype.OnBuild.call(this);
		this.m_enabled = true;
		this.m_is_behaviour = true;
		haxor.context.EngineContext.Enable(this);
	}
	,OnAwake: function() {
	}
	,OnStart: function() {
	}
	,__class__: haxor.component.Behaviour
});
haxor.component.Camera = function(p_name) {
	haxor.component.Behaviour.call(this,p_name);
};
$hxClasses["haxor.component.Camera"] = haxor.component.Camera;
haxor.component.Camera.__name__ = ["haxor","component","Camera"];
haxor.component.Camera.get_list = function() {
	return haxor.context.EngineContext.camera.list.slice();
};
haxor.component.Camera.get_current = function() {
	return haxor.component.Camera.m_current;
};
haxor.component.Camera.get_main = function() {
	return haxor.component.Camera.m_main;
};
haxor.component.Camera.set_main = function(v) {
	return haxor.component.Camera.m_main = v;
};
haxor.component.Camera.__super__ = haxor.component.Behaviour;
haxor.component.Camera.prototype = $extend(haxor.component.Behaviour.prototype,{
	get_mask: function() {
		return this.m_mask;
	}
	,set_mask: function(v) {
		if(this.m_mask == v) return v;
		this.m_mask = v;
		var it = this.m_mask;
		this.m_layers = [];
		var _g = 0;
		while(_g < 32) {
			var i = _g++;
			if((it & 1) != 0) this.m_layers.push(1 << i);
			it = it >> 1;
		}
		return v;
	}
	,get_fov: function() {
		return this.m_fov;
	}
	,set_fov: function(v) {
		this.m_fov = v;
		this.m_projection_dirty = true;
		return v;
	}
	,get_near: function() {
		return this.m_near;
	}
	,set_near: function(v) {
		this.m_near = v;
		this.m_projection_dirty = true;
		this.m_proj_uniform_dirty = true;
		return v;
	}
	,get_far: function() {
		return this.m_far;
	}
	,set_far: function(v) {
		this.m_far = v;
		this.m_projection_dirty = true;
		this.m_proj_uniform_dirty = true;
		return v;
	}
	,get_order: function() {
		return this.m_order;
	}
	,set_order: function(v) {
		if(this.m_order == v) return v;
		this.m_order = v;
		haxor.context.EngineContext.camera.SortCameraList();
		return this.m_order;
	}
	,get_pixelViewport: function() {
		return this.m_pixelViewport.get_clone();
	}
	,get_viewport: function() {
		return this.m_viewport.get_clone();
	}
	,set_viewport: function(v) {
		this.m_viewport.SetAABB2(v);
		haxor.context.EngineContext.camera.UpdateViewport(this);
		return v;
	}
	,get_CameraToWorld: function() {
		return this.m_entity.m_transform.get_WorldMatrix();
	}
	,get_WorldToCamera: function() {
		return this.m_entity.m_transform.get_WorldMatrixInverse();
	}
	,get_ProjectionMatrix: function() {
		this.UpdateProjection();
		return this.m_projectionMatrix;
	}
	,get_ProjectionMatrixInverse: function() {
		this.UpdateProjection();
		return this.m_projectionMatrixInverse;
	}
	,get_target: function() {
		return this.m_target;
	}
	,set_target: function(v) {
		this.m_target = v;
		haxor.context.EngineContext.camera.UpdateViewport(this);
		return v;
	}
	,get_quality: function() {
		return this.m_quality;
	}
	,set_quality: function(v) {
		if(v <= 0.0) this.m_quality = 0.0; else if(v >= 1.0) this.m_quality = 1.0; else this.m_quality = v;
		haxor.context.EngineContext.camera.UpdateViewport(this);
		return v;
	}
	,get_captureDepth: function() {
		return this.m_captureDepth;
	}
	,set_captureDepth: function(v) {
		this.m_captureDepth = v;
		haxor.context.EngineContext.camera.ClearTargets(this);
		haxor.context.EngineContext.camera.UpdateViewport(this);
		return v;
	}
	,get_filters: function() {
		return this.m_filters;
	}
	,set_filters: function(v) {
		if(v == null) this.m_filters = []; else this.m_filters = v;
		return this.m_filters;
	}
	,get_frustum: function() {
		this.UpdateProjection();
		return this.m_frustum;
	}
	,OnBuild: function() {
		haxor.component.Behaviour.prototype.OnBuild.call(this);
		haxor.context.EngineContext.camera.Create(this);
		if(haxor.component.Camera.m_main == null) haxor.component.Camera.m_main = this;
		this.m_order = 0;
		this.m_quality = 1.0;
		this.m_pixelViewport = haxor.math.AABB2.get_empty();
		this.m_viewport = haxor.math.AABB2.get_empty();
		this.m_projectionMatrix = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		this.m_projectionMatrixInverse = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		this.m_skyboxProjection = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		this.m_skyboxProjectionInverse = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		this.m_fov = 60;
		this.m_near = 0.1;
		this.m_far = 500;
		this.m_filters = [];
		this.background = new haxor.math.Color(0,0,0,1);
		this.clear = haxor.core.ClearFlag.ColorDepth;
		this.set_mask(1);
		this.set_viewport(new haxor.math.AABB2(0,0,1,1));
		this.m_projection_dirty = true;
		this.m_view_uniform_dirty = true;
		this.m_proj_uniform_dirty = true;
		this.m_frustum = [new haxor.math.Vector4(),new haxor.math.Vector4(),new haxor.math.Vector4(),new haxor.math.Vector4(),new haxor.math.Vector4(),new haxor.math.Vector4(),new haxor.math.Vector4(),new haxor.math.Vector4()];
	}
	,WorldToProjection: function(p_world_point,p_result) {
		var p;
		if(p_result == null) p = new haxor.math.Vector4(); else p = p_result;
		p.w = 1.0;
		p.x = p_world_point.x;
		p.y = p_world_point.y;
		p.z = p_world_point.z;
		this.get_WorldToCamera().Transform4x4(p);
		((function($this) {
			var $r;
			$this.UpdateProjection();
			$r = $this.m_projectionMatrix;
			return $r;
		}(this))).Transform4x4(p);
		return p;
	}
	,WorldToDepth: function(p_world_point) {
		var wm = this.get_WorldToCamera();
		return wm.m20 * p_world_point.x + wm.m21 * p_world_point.y + wm.m22 * p_world_point.z + wm.m23;
	}
	,IsCulled: function(p_world_point) {
		return this.WorldToProjection(p_world_point).IsCulled();
	}
	,LookAt: function(p_at,p_up,p_smooth) {
		if(p_smooth == null) p_smooth = 0.0;
		this.m_entity.m_transform.LookAt(p_at,p_up,p_smooth);
	}
	,UpdateProjection: function() {
		if(!this.m_projection_dirty) return;
		this.m_projection_dirty = false;
		this.m_view_uniform_dirty = true;
		haxor.math.Matrix4.Perspective(this.m_fov,this.m_aspect,this.m_near,this.m_far,this.m_projectionMatrix);
		haxor.math.Matrix4.PerspectiveInverse(this.m_fov,this.m_aspect,this.m_near,this.m_far,this.m_projectionMatrixInverse);
		haxor.math.Matrix4.Perspective(this.m_fov,this.m_aspect,0.1,100000.0,this.m_skyboxProjection);
		haxor.math.Matrix4.PerspectiveInverse(this.m_fov,this.m_aspect,0.1,100000.0,this.m_skyboxProjectionInverse);
		var p;
		var iw = 0.0;
		p = this.m_frustum[0];
		p.Set(-1.0,1.0,0.0,1.0);
		this.m_projectionMatrixInverse.Transform4x4(p);
		if(p.w <= 0.0) iw = 0.0; else iw = 1.0 / p.w;
		p.Scale(iw);
		p = this.m_frustum[1];
		p.Set(1.0,1.0,0.0,1.0);
		this.m_projectionMatrixInverse.Transform4x4(p);
		if(p.w <= 0.0) iw = 0.0; else iw = 1.0 / p.w;
		p.Scale(iw);
		p = this.m_frustum[2];
		p.Set(-1.0,-1.0,0.0,1.0);
		this.m_projectionMatrixInverse.Transform4x4(p);
		if(p.w <= 0.0) iw = 0.0; else iw = 1.0 / p.w;
		p.Scale(iw);
		p = this.m_frustum[3];
		p.Set(1.0,-1.0,0.0,1.0);
		this.m_projectionMatrixInverse.Transform4x4(p);
		if(p.w <= 0.0) iw = 0.0; else iw = 1.0 / p.w;
		p.Scale(iw);
		p = this.m_frustum[4];
		p.Set(-1.0,1.0,1.0,1.0);
		this.m_projectionMatrixInverse.Transform4x4(p);
		if(p.w <= 0.0) iw = 0.0; else iw = 1.0 / p.w;
		p.Scale(iw);
		p = this.m_frustum[5];
		p.Set(1.0,1.0,1.0,1.0);
		this.m_projectionMatrixInverse.Transform4x4(p);
		if(p.w <= 0.0) iw = 0.0; else iw = 1.0 / p.w;
		p.Scale(iw);
		p = this.m_frustum[6];
		p.Set(-1.0,-1.0,1.0,1.0);
		this.m_projectionMatrixInverse.Transform4x4(p);
		if(p.w <= 0.0) iw = 0.0; else iw = 1.0 / p.w;
		p.Scale(iw);
		p = this.m_frustum[7];
		p.Set(1.0,-1.0,1.0,1.0);
		this.m_projectionMatrixInverse.Transform4x4(p);
		if(p.w <= 0.0) iw = 0.0; else iw = 1.0 / p.w;
		p.Scale(iw);
	}
	,OnTransformUpdate: function() {
		this.m_view_uniform_dirty = true;
	}
	,OnDestroy: function() {
		haxor.context.EngineContext.camera.Destroy(this);
	}
	,__class__: haxor.component.Camera
});
haxor.math = {};
haxor.math.Color = function(p_r,p_g,p_b,p_a) {
	if(p_a == null) p_a = 1;
	if(p_b == null) p_b = 0;
	if(p_g == null) p_g = 0;
	if(p_r == null) p_r = 0;
	this.r = p_r;
	this.g = p_g;
	this.b = p_b;
	this.a = p_a;
};
$hxClasses["haxor.math.Color"] = haxor.math.Color;
haxor.math.Color.__name__ = ["haxor","math","Color"];
haxor.math.Color.get_temp = function() {
	return haxor.context.EngineContext.data.get_c();
};
haxor.math.Color.get_red = function() {
	return new haxor.math.Color(1.0,0,0,1);
};
haxor.math.Color.get_yellow = function() {
	return new haxor.math.Color(1,1,0,1);
};
haxor.math.Color.get_green = function() {
	return new haxor.math.Color(0,1,0,1);
};
haxor.math.Color.get_cyan = function() {
	return new haxor.math.Color(0,1,1,1);
};
haxor.math.Color.get_blue = function() {
	return new haxor.math.Color(0,0,1,1);
};
haxor.math.Color.get_magenta = function() {
	return new haxor.math.Color(1,0,1,1);
};
haxor.math.Color.get_black = function() {
	return new haxor.math.Color(0,0,0,1);
};
haxor.math.Color.get_white = function() {
	return new haxor.math.Color(1,1,1,1);
};
haxor.math.Color.get_empty = function() {
	return new haxor.math.Color(0,0,0,0);
};
haxor.math.Color.get_gray10 = function() {
	return new haxor.math.Color(0.1,0.1,0.1,1);
};
haxor.math.Color.get_gray25 = function() {
	return new haxor.math.Color(0.25,0.25,0.25,1);
};
haxor.math.Color.get_gray50 = function() {
	return new haxor.math.Color(0.5,0.5,0.5,1);
};
haxor.math.Color.get_gray75 = function() {
	return new haxor.math.Color(0.75,0.75,0.75,1);
};
haxor.math.Color.get_gray90 = function() {
	return new haxor.math.Color(0.9,0.9,0.9,1);
};
haxor.math.Color.FromHex = function(p_hex) {
	var c = new haxor.math.Color();
	if(p_hex.length == 10) c.set_argb(Std.parseInt(p_hex)); else c.set_rgb(Std.parseInt(p_hex));
	return c;
};
haxor.math.Color.FromBytes = function(p_r,p_g,p_b,p_a) {
	if(p_a == null) p_a = 255.0;
	if(p_b == null) p_b = 0;
	if(p_g == null) p_g = 0;
	if(p_r == null) p_r = 0;
	return new haxor.math.Color(p_r * 0.00392156863,p_g * 0.00392156863,p_b * 0.00392156863,p_a * 0.00392156863);
};
haxor.math.Color.Lerp = function(a,b,r) {
	return new haxor.math.Color(haxor.math.Mathf.Lerp(a.r,b.r,r),haxor.math.Mathf.Lerp(a.g,b.g,r),haxor.math.Mathf.Lerp(a.b,b.b,r),haxor.math.Mathf.Lerp(a.a,b.a,r));
};
haxor.math.Color.Sample = function(g,r) {
	var pos = g.length - 1;
	pos *= r * 0.9999;
	var i0 = pos | 0;
	var i1 = (i0 + 1) % g.length;
	r = pos - Math.floor(pos);
	var c0 = g[i0];
	var c1 = g[i1];
	return haxor.math.Color.Lerp(c0,c1,r);
};
haxor.math.Color.Parse = function(p_data,p_delimiter) {
	if(p_delimiter == null) p_delimiter = " ";
	var tk = p_data.split(p_delimiter);
	return new haxor.math.Color(0,0,0,1).Set(Std.parseFloat(StringTools.trim(tk[0])),Std.parseFloat(StringTools.trim(tk[1])),Std.parseFloat(StringTools.trim(tk[2])),Std.parseFloat(StringTools.trim(tk[3])));
};
haxor.math.Color.prototype = {
	get_clone: function() {
		return new haxor.math.Color(this.r,this.g,this.b,this.a);
	}
	,get_xyz: function() {
		return new haxor.math.Vector3(this.r,this.g,this.b);
	}
	,get_xyzw: function() {
		return new haxor.math.Vector4(this.r,this.g,this.b,this.a);
	}
	,get_argb: function() {
		var rb = this.r * 255.0;
		var gb = this.g * 255.0;
		var bb = this.b * 255.0;
		var ab = this.a * 255.0;
		return ab << 24 | rb << 16 | gb << 8 | bb;
	}
	,set_argb: function(v) {
		this.a = (v >> 24 & 255) * 0.00392156863;
		this.r = (v >> 16 & 255) * 0.00392156863;
		this.g = (v >> 8 & 255) * 0.00392156863;
		this.b = (v & 255) * 0.00392156863;
		return v;
	}
	,get_css: function() {
		return "rgba(" + (this.r * 255 | 0) + "," + (this.g * 255 | 0) + "," + (this.b * 255 | 0) + "," + this.a + ")";
	}
	,get_rgba: function() {
		var rb = this.r * 255.0;
		var gb = this.g * 255.0;
		var bb = this.b * 255.0;
		var ab = this.a * 255.0;
		return rb << 24 | gb << 16 | bb << 8 | ab;
	}
	,set_rgba: function(v) {
		this.r = (v >> 24 & 255) * 0.00392156863;
		this.g = (v >> 16 & 255) * 0.00392156863;
		this.b = (v >> 8 & 255) * 0.00392156863;
		this.a = (v & 255) * 0.00392156863;
		return v;
	}
	,get_rgb: function() {
		var rb = this.r * 255.0;
		var gb = this.g * 255.0;
		var bb = this.b * 255.0;
		return rb << 16 | gb << 8 | bb;
	}
	,set_rgb: function(v) {
		this.r = (v >> 16 & 255) * 0.00392156863;
		this.g = (v >> 8 & 255) * 0.00392156863;
		this.b = (v & 255) * 0.00392156863;
		return v;
	}
	,get_luminance: function() {
		return this.r * 0.3 + this.g * 0.59 + this.b * 0.11;
	}
	,get_negative: function() {
		return new haxor.math.Color(1.0 - this.r,1.0 - this.g,1.0 - this.b,1.0 - this.a);
	}
	,Set: function(p_r,p_g,p_b,p_a) {
		if(p_a == null) p_a = 1;
		if(p_b == null) p_b = 0;
		if(p_g == null) p_g = 0;
		if(p_r == null) p_r = 0;
		this.r = p_r;
		this.g = p_g;
		this.b = p_b;
		this.a = p_a;
		return this;
	}
	,Set3: function(v) {
		this.r = v.x;
		this.g = v.y;
		this.b = v.z;
		return this;
	}
	,Set4: function(v) {
		this.r = v.x;
		this.g = v.y;
		this.b = v.z;
		this.a = v.w;
		return this;
	}
	,SetColor: function(p_color) {
		this.r = p_color.r;
		this.g = p_color.g;
		this.b = p_color.b;
		this.a = p_color.a;
		return this;
	}
	,Get: function(p) {
		if(p == 0) return this.r; else if(p == 1) return this.g; else if(p == 2) return this.b; else return this.a;
	}
	,Add: function(p_v) {
		this.r += p_v.r;
		this.g += p_v.g;
		this.b += p_v.b;
		this.a += p_v.a;
		return this;
	}
	,Sub: function(p_v) {
		this.r -= p_v.r;
		this.g -= p_v.g;
		this.b -= p_v.b;
		this.a -= p_v.a;
		return this;
	}
	,Multiply: function(p_v) {
		this.r *= p_v.r;
		this.g *= p_v.g;
		this.b *= p_v.b;
		this.a *= p_v.a;
		return this;
	}
	,MultiplyRGB: function(p_v) {
		this.r *= p_v.r;
		this.g *= p_v.g;
		this.b *= p_v.b;
		return this;
	}
	,Scale: function(p_s) {
		this.r *= p_s;
		this.g *= p_s;
		this.b *= p_s;
		this.a *= p_s;
		return this;
	}
	,ScaleRGB: function(p_s) {
		this.r *= p_s;
		this.g *= p_s;
		this.b *= p_s;
		return this;
	}
	,ToArray: function() {
		return [this.r,this.g,this.b,this.a];
	}
	,ToString: function(p_places) {
		if(p_places == null) p_places = 2;
		return "[" + haxor.math.Mathf.RoundPlaces(this.r,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.g,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.b,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.a,p_places) + "]";
	}
	,__class__: haxor.math.Color
};
haxor.component.Light = function() {
	if(haxor.component.Light.m_list == null) haxor.component.Light.m_list = [];
	if(haxor.component.Light.m_buffer == null) haxor.component.Light.m_buffer = new haxor.io.FloatArray(12 * haxor.component.Light.max);
	haxor.component.Light.m_list.push(this);
	haxor.component.Behaviour.call(this);
	this.color = new haxor.math.Color(1,1,1,1);
	this.intensity = 1.0;
};
$hxClasses["haxor.component.Light"] = haxor.component.Light;
haxor.component.Light.__name__ = ["haxor","component","Light"];
haxor.component.Light.get_list = function() {
	var l = new Array();
	if(haxor.component.Light.m_list == null) return l;
	var i = 0;
	while(i < haxor.component.Light.m_list.length) {
		l.push(haxor.component.Light.m_list[i]);
		i++;
	}
	return l;
};
haxor.component.Light.SetLightData = function(p_id,p_type,p_intensity,p_radius,p_atten,p_x,p_y,p_z,p_r,p_g,p_b,p_a) {
	var pos = p_id * 12;
	haxor.component.Light.m_buffer.Set(pos,p_type);
	haxor.component.Light.m_buffer.Set(pos + 1,p_intensity);
	haxor.component.Light.m_buffer.Set(pos + 2,p_radius);
	haxor.component.Light.m_buffer.Set(pos + 3,p_atten);
	haxor.component.Light.m_buffer.Set(pos + 4,p_x);
	haxor.component.Light.m_buffer.Set(pos + 5,p_y);
	haxor.component.Light.m_buffer.Set(pos + 6,p_z);
	haxor.component.Light.m_buffer.Set(pos + 8,p_r);
	haxor.component.Light.m_buffer.Set(pos + 9,p_g);
	haxor.component.Light.m_buffer.Set(pos + 10,p_b);
	haxor.component.Light.m_buffer.Set(pos + 11,p_a);
};
haxor.component.Light.__super__ = haxor.component.Behaviour;
haxor.component.Light.prototype = $extend(haxor.component.Behaviour.prototype,{
	OnDestroy: function() {
		haxor.component.Behaviour.prototype.OnDestroy.call(this);
		HxOverrides.remove(haxor.component.Light.m_list,this);
	}
	,__class__: haxor.component.Light
});
haxor.component.Renderer = function(p_name) {
	this.m_has_mesh = false;
	haxor.component.Behaviour.call(this,p_name);
};
$hxClasses["haxor.component.Renderer"] = haxor.component.Renderer;
haxor.component.Renderer.__name__ = ["haxor","component","Renderer"];
haxor.component.Renderer.__super__ = haxor.component.Behaviour;
haxor.component.Renderer.prototype = $extend(haxor.component.Behaviour.prototype,{
	get_material: function() {
		return this.m_material;
	}
	,set_material: function(v) {
		if(this.m_material == v) return v;
		this.m_material = v;
		if(v == null) this.m_last_queue = -1; else this.m_last_queue = v.queue;
		haxor.context.EngineContext.renderer.OnMaterialChange(this);
		return v;
	}
	,get_visible: function() {
		return this.m_visible && !this.m_culled;
	}
	,set_visible: function(v) {
		this.m_visible = v;
		return v;
	}
	,OnBuild: function() {
		haxor.component.Behaviour.prototype.OnBuild.call(this);
		this.m_last_queue = -1;
		this.m_visible = true;
		this.m_culled = false;
		haxor.context.EngineContext.renderer.Create(this);
	}
	,OnRender: function() {
		if(this.m_material != null) {
			if(this.m_last_queue != this.m_material.queue) {
				this.m_last_queue = this.m_material.queue;
				haxor.context.EngineContext.renderer.OnMaterialChange(this);
			}
		}
	}
	,UpdateCulling: function() {
		var v0 = this.m_culled;
		var v1 = this.CheckCulling();
		this.m_culled = v1;
		if(v0 != v1) haxor.context.EngineContext.renderer.OnVisibilityChange(this,!v1);
	}
	,CheckCulling: function() {
		return false;
	}
	,OnDestroy: function() {
		haxor.context.EngineContext.renderer.Destroy(this);
	}
	,__class__: haxor.component.Renderer
});
haxor.component.MeshRenderer = function(p_name) {
	haxor.component.Renderer.call(this,p_name);
};
$hxClasses["haxor.component.MeshRenderer"] = haxor.component.MeshRenderer;
haxor.component.MeshRenderer.__name__ = ["haxor","component","MeshRenderer"];
haxor.component.MeshRenderer.__super__ = haxor.component.Renderer;
haxor.component.MeshRenderer.prototype = $extend(haxor.component.Renderer.prototype,{
	get_mesh: function() {
		return this.m_mesh;
	}
	,set_mesh: function(v) {
		if(this.m_mesh == v) return v;
		this.m_mesh = v;
		this.UpdateWorldBounds();
		return v;
	}
	,OnBuild: function() {
		this.m_has_mesh = true;
		haxor.component.Renderer.prototype.OnBuild.call(this);
		this.m_ws_center = new haxor.math.Vector3(0,0,0);
		this.m_ws_radius = new haxor.math.Vector3(0,0,0);
		this.m_culling_dirty = false;
	}
	,IsVisible: function(p_camera) {
		var c = p_camera;
		if(c == null) return false;
		if(this.m_mesh == null) return false;
		var ps_center = c.WorldToProjection(haxor.context.EngineContext.data.get_v3().Set3(this.m_ws_center),haxor.context.EngineContext.data.get_v4());
		var w = ps_center.w;
		var p = ps_center;
		if(w <= 0.0) return false;
		if(p.x >= -w) {
			if(p.x <= w) {
				if(p.y >= -w) {
					if(p.y <= w) {
						if(p.z >= -w) {
							if(p.z <= w) return true;
						}
					}
				}
			}
		}
		var v = c.WorldToProjection(haxor.context.EngineContext.data.get_v3().Set3(this.m_ws_radius),haxor.context.EngineContext.data.get_v4());
		var r = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z + v.w * v.w);
		if(p.x + r >= -w) {
			if(p.x - r <= w) {
				if(p.y + r >= -w) {
					if(p.y - r <= w) {
						if(p.z + r >= -w) {
							if(p.z - r <= w) return true;
						}
					}
				}
			}
		}
		return false;
	}
	,CheckCulling: function() {
		var c = haxor.component.Camera.m_current;
		if(c == null) return this.m_culled;
		if(!c.m_view_uniform_dirty) {
			if(!c.m_proj_uniform_dirty) {
				if(!this.m_culling_dirty) return this.m_culled;
			}
		}
		this.UpdateWorldBounds();
		return !this.IsVisible(c);
	}
	,OnTransformUpdate: function() {
		this.m_culling_dirty = true;
	}
	,UpdateWorldBounds: function() {
		if(this.m_mesh != null) {
			haxor.math.AABB3.Center(this.m_mesh.m_bounds,this.m_ws_center);
			this.m_entity.m_transform.get_WorldMatrix().Transform3x4(this.m_ws_center);
			this.m_ws_radius.Set(this.m_mesh.m_bounds.get_width(),this.m_mesh.m_bounds.get_height(),this.m_mesh.m_bounds.get_depth());
			this.m_entity.m_transform.get_WorldMatrix().Transform3x3(this.m_ws_radius);
			var r = this.m_ws_radius.get_length();
			var pmin = haxor.context.EngineContext.data.get_v3();
			var pmax = haxor.context.EngineContext.data.get_v3();
			pmin.Set(this.m_ws_center.x - r,this.m_ws_center.y - r,this.m_ws_center.z - r);
			pmax.Set(this.m_ws_center.x + r,this.m_ws_center.y + r,this.m_ws_center.z + r);
			haxor.context.EngineContext.renderer.UpdateSAP(this.__fcid,this,pmin,pmax);
			this.m_culling_dirty = false;
		}
	}
	,OnRender: function() {
		haxor.component.Renderer.prototype.OnRender.call(this);
		if(this.m_mesh == null) return;
		haxor.graphics.Graphics.Render(this.m_mesh,this.m_material,this.m_entity.m_transform,haxor.component.Camera.m_current);
	}
	,__class__: haxor.component.MeshRenderer
});
haxor.component.Transform = function(p_name) {
	haxor.component.Component.call(this,p_name);
};
$hxClasses["haxor.component.Transform"] = haxor.component.Transform;
haxor.component.Transform.__name__ = ["haxor","component","Transform"];
haxor.component.Transform.TransformConcat = function(t) {
	var v = t.m_parent.m_worldMatrix;
	var m = t.m_worldMatrix;
	m.m00 = v.m00;
	m.m01 = v.m01;
	m.m02 = v.m02;
	m.m03 = v.m03;
	m.m10 = v.m10;
	m.m11 = v.m11;
	m.m12 = v.m12;
	m.m13 = v.m13;
	m.m20 = v.m20;
	m.m21 = v.m21;
	m.m22 = v.m22;
	m.m23 = v.m23;
	m.MultiplyTransform(t.m_localMatrix);
	t.m_wsp_dirty = true;
	t.m_wsrs_dirty = true;
	t.m_right.Set(m.m00,m.m10,m.m20).Normalize();
	t.m_up.Set(m.m01,m.m11,m.m21).Normalize();
	t.m_forward.Set(m.m02,m.m12,m.m22).Normalize();
	t.m_inverse_dirty = true;
};
haxor.component.Transform.get_root = function() {
	return haxor.component.Transform.m_root;
};
haxor.component.Transform.__super__ = haxor.component.Component;
haxor.component.Transform.prototype = $extend(haxor.component.Component.prototype,{
	get_right: function() {
		this.UpdateWorldMatrix();
		return this.m_right.get_clone();
	}
	,set_right: function(v) {
		return v;
	}
	,get_up: function() {
		this.UpdateWorldMatrix();
		return this.m_up.get_clone();
	}
	,set_up: function(v) {
		return v;
	}
	,get_forward: function() {
		this.UpdateWorldMatrix();
		return this.m_forward.get_inverse();
	}
	,set_forward: function(v) {
		return v;
	}
	,get_parent: function() {
		return this.m_parent;
	}
	,set_parent: function(v) {
		var wp = this.get_position();
		var wr = this.get_rotation();
		var ws = this.get_scale();
		if(this.m_parent != null) HxOverrides.remove(this.m_parent.m_hierarchy,this);
		if(v == null) this.m_parent = haxor.component.Transform.m_root; else this.m_parent = v;
		this.m_parent.m_hierarchy.push(this);
		return this.m_parent;
	}
	,get_childCount: function() {
		return this.m_hierarchy.length;
	}
	,get_localPosition: function() {
		return this.m_localPosition.get_clone();
	}
	,set_localPosition: function(v) {
		var dx = v.x - this.m_localPosition.x;
		var dy = v.y - this.m_localPosition.y;
		var dz = v.z - this.m_localPosition.z;
		if(Math.abs(dx) < 0.0001) {
			if(Math.abs(dy) < 0.0001) {
				if(Math.abs(dz) < 0.0001) return v;
			}
		}
		this.m_localPosition.Set3(v);
		this.m_lmt_dirty = true;
		this.Invalidate();
		return v;
	}
	,get_localRotation: function() {
		return this.m_localRotation.get_clone();
	}
	,set_localRotation: function(v) {
		var dx = v.x - this.m_localRotation.x;
		var dy = v.y - this.m_localRotation.y;
		var dz = v.z - this.m_localRotation.z;
		var dw = v.w - this.m_localRotation.w;
		if(Math.abs(dx) < 0.0001) {
			if(Math.abs(dy) < 0.0001) {
				if(Math.abs(dz) < 0.0001) {
					if(Math.abs(dw) < 0.0001) return v;
				}
			}
		}
		this.m_localRotation.SetQuaternion(v);
		this.m_lmrs_dirty = true;
		this.Invalidate();
		return v;
	}
	,get_localEuler: function() {
		return this.m_localRotation.get_euler();
	}
	,set_localEuler: function(v) {
		this.set_localRotation(haxor.math.Quaternion.FromEuler(v,haxor.context.EngineContext.data.get_q()));
		return v;
	}
	,get_localScale: function() {
		return this.m_localScale.get_clone();
	}
	,set_localScale: function(v) {
		var dx = v.x - this.m_localScale.x;
		var dy = v.y - this.m_localScale.y;
		var dz = v.z - this.m_localScale.z;
		if(Math.abs(dx) < 0.0001) {
			if(Math.abs(dy) < 0.0001) {
				if(Math.abs(dz) < 0.0001) return v;
			}
		}
		this.m_localScale.Set3(v);
		this.m_lmrs_dirty = true;
		this.Invalidate();
		return v;
	}
	,get_position: function() {
		this.UpdateWorldMatrix();
		this.UpdateWSP();
		return this.m_position.get_clone();
	}
	,set_position: function(v) {
		this.set_localPosition(this.m_parent.get_WorldMatrixInverse().Transform3x4(haxor.context.EngineContext.data.get_v3().Set3(v)));
		return v;
	}
	,get_rotation: function() {
		this.UpdateWorldMatrix();
		this.UpdateWSRS();
		return this.m_rotation.get_clone();
	}
	,set_rotation: function(v) {
		this.UpdateWorldMatrix();
		this.UpdateWSRS();
		var iq = haxor.math.Quaternion.Inverse(this.m_rotation,haxor.context.EngineContext.data.get_q());
		this.set_localRotation(haxor.context.EngineContext.data.get_q().SetQuaternion(v).Multiply(iq));
		return v;
	}
	,get_euler: function() {
		return this.get_rotation().get_euler();
	}
	,set_euler: function(v) {
		this.set_rotation(haxor.math.Quaternion.FromEuler(v,haxor.context.EngineContext.data.get_q()));
		return v;
	}
	,get_scale: function() {
		this.UpdateWorldMatrix();
		this.UpdateWSRS();
		return this.m_scale.get_clone();
	}
	,get_WorldMatrix: function() {
		this.UpdateWorldMatrix();
		return this.m_worldMatrix;
	}
	,get_WorldMatrixInverse: function() {
		this.UpdateWorldMatrix();
		if(this.m_inverse_dirty) {
			haxor.math.Matrix4.GetInverseTransform(this.m_worldMatrix,this.m_worldMatrixInverse);
			this.m_inverse_dirty = false;
		}
		return this.m_worldMatrixInverse;
	}
	,OnBuild: function() {
		haxor.component.Component.prototype.OnBuild.call(this);
		this.__cid = haxor.context.EngineContext.transform.tid.get_id();
		this.m_localPosition = new haxor.math.Vector3(0,0,0);
		this.m_localRotation = new haxor.math.Quaternion(0,0,0,1.0);
		this.m_localScale = new haxor.math.Vector3(1,1,1);
		this.m_position = new haxor.math.Vector3(0,0,0);
		this.m_rotation = new haxor.math.Quaternion(0,0,0,1.0);
		this.m_scale = new haxor.math.Vector3(1,1,1);
		this.m_lmt_dirty = false;
		this.m_lmrs_dirty = false;
		this.m_dirty = false;
		this.m_inverse_dirty = false;
		this.m_wsp_dirty = false;
		this.m_wsrs_dirty = false;
		this.m_uniform_dirty = true;
		this.m_right = new haxor.math.Vector3(1,0,0);
		this.m_up = new haxor.math.Vector3(0,1,0);
		this.m_forward = haxor.math.Vector3.get_forward();
		this.m_localMatrix = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		this.m_worldMatrixInverse = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		this.m_worldMatrix = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		this.m_hierarchy = [];
		if(haxor.component.Transform.m_root != null) this.set_parent(null); else haxor.component.Transform.m_root = this;
	}
	,UpdateLMT: function() {
		this.m_localMatrix.m03 = this.m_localPosition.x;
		this.m_localMatrix.m13 = this.m_localPosition.y;
		this.m_localMatrix.m23 = this.m_localPosition.z;
	}
	,UpdateWSP: function() {
		if(this.m_wsp_dirty) {
			this.m_position.x = this.m_worldMatrix.m03;
			this.m_position.y = this.m_worldMatrix.m13;
			this.m_position.z = this.m_worldMatrix.m23;
			this.m_wsp_dirty = false;
		}
	}
	,UpdateLMRS: function() {
		var sx = this.m_localScale.x;
		var sy = this.m_localScale.y;
		var sz = this.m_localScale.z;
		var r = haxor.math.Matrix4.FromQuaternion(this.m_localRotation,haxor.context.EngineContext.data.get_m4());
		var l = this.m_localMatrix;
		l.m00 = r.m00 * sx;
		l.m01 = r.m01 * sy;
		l.m02 = r.m02 * sz;
		l.m10 = r.m10 * sx;
		l.m11 = r.m11 * sy;
		l.m12 = r.m12 * sz;
		l.m20 = r.m20 * sx;
		l.m21 = r.m21 * sy;
		l.m22 = r.m22 * sz;
	}
	,UpdateWSRS: function() {
		if(this.m_wsrs_dirty) {
			var m = this.m_worldMatrix;
			var c0 = haxor.context.EngineContext.data.get_v3().Set(m.m00,m.m10,m.m20);
			var c1 = haxor.context.EngineContext.data.get_v3().Set(m.m01,m.m11,m.m21);
			var c2 = haxor.context.EngineContext.data.get_v3().Set(m.m02,m.m12,m.m22);
			var l0 = Math.sqrt(c0.x * c0.x + c0.y * c0.y + c0.z * c0.z);
			var l1 = Math.sqrt(c1.x * c1.x + c1.y * c1.y + c1.z * c1.z);
			var l2 = Math.sqrt(c2.x * c2.x + c2.y * c2.y + c2.z * c2.z);
			this.m_scale.x = l0;
			this.m_scale.y = l1;
			this.m_scale.z = l2;
			if(l0 <= 0.0) l0 = 0.0; else l0 = 1.0 / l0;
			if(l1 <= 0.0) l1 = 0.0; else l1 = 1.0 / l1;
			if(l2 <= 0.0) l2 = 0.0; else l2 = 1.0 / l2;
			c0.Scale(l0);
			c1.Scale(l1);
			c2.Scale(l2);
			var r = haxor.context.EngineContext.data.get_m4().Set(c0.x,c1.x,c2.x,0.0,c0.y,c1.y,c2.y,0.0,c0.z,c1.z,c2.z,0.0,0.0,0.0,0.0,1.0);
			haxor.math.Quaternion.FromMatrix4(r,this.m_rotation);
			this.m_wsrs_dirty = false;
		}
	}
	,UpdateWorldMatrix: function() {
		var need_concat = this.m_dirty;
		if(this.m_lmt_dirty) {
			this.UpdateLMT();
			this.m_lmt_dirty = false;
			need_concat = true;
		}
		if(this.m_lmrs_dirty) {
			this.UpdateLMRS();
			this.m_lmrs_dirty = false;
			need_concat = true;
		}
		if(this.m_parent != null) {
			if(this.m_dirty) this.m_parent.UpdateWorldMatrix();
			this.m_dirty = false;
			if(need_concat) haxor.component.Transform.TransformConcat(this);
		}
	}
	,Invalidate: function() {
		if(this.m_dirty) return;
		this.m_uniform_dirty = true;
		this.m_dirty = true;
		haxor.context.EngineContext.transform.OnChange(this);
		var _g1 = 0;
		var _g = this.m_hierarchy.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_hierarchy[i].Invalidate();
		}
	}
	,LookAt: function(p_at,p_up,p_smooth) {
		if(p_smooth == null) p_smooth = 0.0;
		var p = this.m_entity.m_transform.get_position();
		var r = haxor.context.EngineContext.data.get_q();
		var q = haxor.math.Quaternion.LookAt(p,p_at,p_up,haxor.context.EngineContext.data.get_q());
		if(p_smooth > 0) r = haxor.math.Quaternion.Lerp(r,q,p_smooth * haxor.core.Time.m_delta,haxor.context.EngineContext.data.get_q()); else r = q;
		this.m_entity.m_transform.set_rotation(r);
	}
	,GetChild: function(p_index) {
		return this.m_hierarchy[p_index];
	}
	,GetChildByName: function(p_name) {
		var _g1 = 0;
		var _g = this.m_hierarchy.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.m_hierarchy[i].get_name() == p_name) return this.m_hierarchy[i];
		}
		return null;
	}
	,Navigate: function(p_path) {
		var tk = p_path.split(".");
		var t = this;
		while(tk.length > 0) {
			var p = tk.shift();
			t = t.GetChildByName(p);
			if(t == null) return null;
		}
		return t;
	}
	,Search: function(p_name,p_exact) {
		if(p_exact == null) p_exact = true;
		var _g = this;
		var res = null;
		this.Traverse(function(it,d) {
			if(it == _g) return true;
			if(res != null) return true;
			if(p_exact) {
				if(it.get_name() == p_name) res = it;
			} else if(it.get_name().indexOf(p_name) >= 0) res = it;
			return true;
		});
		return res;
	}
	,GetPathToRoot: function() {
		var p = this.m_parent;
		var res = [];
		while(p != null) {
			res.push(p);
			p = p.m_parent;
		}
		res.reverse();
		return res;
	}
	,OutputHierarchy: function(p_show_transform,p_show_world) {
		if(p_show_world == null) p_show_world = false;
		if(p_show_transform == null) p_show_transform = true;
		var d0 = 0;
		var hs = "";
		this.Traverse(function(t,d) {
			var tab = "";
			var td = d;
			var d1 = Math.max(0,td - d0);
			var _g = 0;
			while(_g < d1) {
				var i = _g++;
				tab += " ";
			}
			hs += tab + t.get_name() + " ";
			if(p_show_transform) hs += t.get_position().ToString() + t.get_rotation().ToString() + t.get_scale().ToString();
			if(p_show_world) hs += t.get_WorldMatrix().ToString(true,3);
			hs += "\n";
			return true;
		});
		return hs;
	}
	,Traverse: function(p_callback) {
		this.TraverseStep(this,0,p_callback);
	}
	,TraverseStep: function(p_child,p_depth,p_callback) {
		if(p_callback(p_child,p_depth)) {
			var _g1 = 0;
			var _g = p_child.m_hierarchy.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.TraverseStep(p_child.GetChild(i),p_depth + 1,p_callback);
			}
		}
	}
	,OnDestroy: function() {
		haxor.context.EngineContext.transform.tid.set_id(this.__cid);
	}
	,ToString: function(p_use_local,p_places) {
		if(p_places == null) p_places = 2;
		if(p_use_local == null) p_use_local = false;
		var p;
		if(p_use_local) p = this.get_localPosition(); else p = this.get_position();
		var e;
		if(p_use_local) e = this.get_localEuler(); else e = this.get_euler();
		var s;
		if(p_use_local) s = this.get_localScale(); else s = this.get_scale();
		return this.get_name() + " " + p.ToString(p_places) + "" + e.ToString(p_places) + "" + s.ToString(p_places);
	}
	,__class__: haxor.component.Transform
});
haxor.context = {};
haxor.context.CameraContext = function() {
	this.cid = new haxor.context.UID();
	this.list = [];
	this.front = [];
	this.back = [];
	var _g = 0;
	while(_g < 64) {
		var i = _g++;
		this.front.push(null);
		this.back.push(null);
	}
};
$hxClasses["haxor.context.CameraContext"] = haxor.context.CameraContext;
haxor.context.CameraContext.__name__ = ["haxor","context","CameraContext"];
haxor.context.CameraContext.prototype = {
	Create: function(c) {
		this.list.push(c);
		this.SortCameraList();
		haxor.context.EngineContext.renderer.AddCamera(c);
	}
	,Destroy: function(c) {
		this.ClearTargets(c);
		HxOverrides.remove(this.list,c);
		this.SortCameraList();
		this.cid.set_id(c.__cid);
		haxor.context.EngineContext.renderer.RemoveCamera(c);
	}
	,Bind: function(c) {
		var ft = this.front[c.__cid];
		var rt = c.m_target;
		var target;
		if(ft == null) target = rt; else target = ft;
		c.UpdateProjection();
		haxor.context.EngineContext.renderer.UpdateCameraSAP(c);
		haxor.context.EngineContext.texture.BindTarget(target);
		haxor.context.EngineContext.renderer.UpdateDisplayList(c);
		haxor.graphics.Graphics.Clear(c);
	}
	,Resize: function() {
		var _g1 = 0;
		var _g = this.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.UpdateViewport(this.list[i]);
		}
	}
	,ClearTargets: function(c) {
		var rt;
		rt = this.front[c.__cid];
		if(rt != null) haxor.core.Resource.Destroy(rt);
		rt = this.back[c.__cid];
		if(rt != null) haxor.core.Resource.Destroy(rt);
		this.front[c.__cid] = null;
		this.back[c.__cid] = null;
	}
	,Unbind: function(c) {
		this.SwapTargets(c);
	}
	,SwapTargets: function(c) {
		var tmp;
		tmp = this.front[c.__cid];
		this.front[c.__cid] = this.back[c.__cid];
		this.back[c.__cid] = tmp;
	}
	,UpdateViewport: function(c) {
		var need_buffer = false;
		if(c.m_quality < 1.0) need_buffer = true; else if(c.get_filters().length > 0) need_buffer = true;
		var w = haxor.graphics.Screen.m_width;
		var h = haxor.graphics.Screen.m_height;
		if(c.m_target != null) {
			w = c.m_target.m_width;
			h = c.m_target.m_height;
		}
		c.m_aspect = w / h;
		var sw = w * c.m_quality;
		var sh = h * c.m_quality;
		if(sw < 1.0) w = 1.0; else w = sw;
		if(sh < 1.0) h = 1.0; else h = sh;
		var vx = Std["int"](c.m_viewport.get_xMin() * w);
		var vy = Std["int"](c.m_viewport.get_yMin() * h);
		var aw = c.m_viewport.get_width() * w;
		var ah = c.m_viewport.get_height() * h;
		c.m_pixelViewport.set_xMin(vx);
		vx;
		c.m_pixelViewport.set_y(h - ah - vy);
		c.m_pixelViewport.set_width(aw);
		c.m_pixelViewport.set_height(ah);
		var tw = aw;
		var th = ah;
		var grt;
		grt = this.front[c.__cid];
		if(grt != null) {
			if(tw != grt.m_width) this.ClearTargets(c); else if(th != grt.m_height) this.ClearTargets(c);
		}
		grt = this.front[c.__cid];
		if(grt == null) {
			if(need_buffer) {
				var tf;
				if(c.m_target == null) tf = haxor.core.PixelFormat.RGB8; else tf = c.m_target.m_format;
				this.front[c.__cid] = new haxor.graphics.texture.RenderTexture(aw,ah,tf,c.m_captureDepth);
				if(c.get_filters().length <= 0) this.back[c.__cid] = this.front[c.__cid]; else this.back[c.__cid] = new haxor.graphics.texture.RenderTexture(aw,ah,tf,c.m_captureDepth);
				this.front[c.__cid].set_name(this.back[c.__cid].set_name("CameraScreenBuffer"));
			}
		}
		c.m_projection_dirty = true;
		c.m_proj_uniform_dirty = true;
	}
	,SortCameraList: function() {
		if(this.list.length > 1) this.list.sort(function(a,b) {
			if(a.get_order() == b.get_order()) {
				if(a.m_entity.get_name() < b.m_entity.get_name()) return -1; else return 1;
			} else if(a.get_order() < b.get_order()) return -1; else return 1;
		});
	}
	,__class__: haxor.context.CameraContext
};
haxor.context.DataContext = function() {
	this.i = [];
	this.v = [];
	this.m_v2 = [];
	this.m_v3 = [];
	this.m_v4 = [];
	this.m_c = [];
	this.m_q = [];
	this.m_m4 = [];
	this.m_aabb3 = [];
	this.m_aabb2 = [];
	this.m_nv2 = 0;
	this.m_nv3 = 0;
	this.m_nv4 = 0;
	this.m_nc = 0;
	this.m_nq = 0;
	this.m_nm4 = 0;
	this.m_naabb3 = 0;
	this.m_naabb2 = 0;
	this.m4l = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var _g1 = 0;
	var _g = haxor.context.DataContext.MAX_TEMP;
	while(_g1 < _g) {
		var k = _g1++;
		this.i.push(0);
		this.v.push(0.0);
		this.m_v2.push(new haxor.math.Vector2(0,0));
		this.m_v3.push(new haxor.math.Vector3(0,0,0));
		this.m_v4.push(new haxor.math.Vector4(0,0,0,0));
		this.m_c.push(new haxor.math.Color(0,0,0,1));
		this.m_q.push(new haxor.math.Quaternion(0,0,0,1.0));
		this.m_m4.push(new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1));
		this.m_aabb3.push(haxor.math.AABB3.get_empty());
		this.m_aabb2.push(haxor.math.AABB2.get_empty());
	}
};
$hxClasses["haxor.context.DataContext"] = haxor.context.DataContext;
haxor.context.DataContext.__name__ = ["haxor","context","DataContext"];
haxor.context.DataContext.prototype = {
	get_v2: function() {
		return this.m_v2[this.m_nv2 = (this.m_nv2 + 1) % this.m_v2.length];
	}
	,get_v3: function() {
		return this.m_v3[this.m_nv3 = (this.m_nv3 + 1) % this.m_v3.length];
	}
	,get_v4: function() {
		return this.m_v4[this.m_nv4 = (this.m_nv4 + 1) % this.m_v4.length];
	}
	,get_c: function() {
		return this.m_c[this.m_nc = (this.m_nc + 1) % this.m_c.length];
	}
	,get_q: function() {
		return this.m_q[this.m_nq = (this.m_nq + 1) % this.m_q.length];
	}
	,get_aabb3: function() {
		return this.m_aabb3[this.m_naabb3 = (this.m_naabb3 + 1) % this.m_aabb3.length];
	}
	,get_aabb2: function() {
		return this.m_aabb2[this.m_naabb2 = (this.m_naabb2 + 1) % this.m_aabb2.length];
	}
	,get_m4: function() {
		return this.m_m4[this.m_nq = (this.m_nm4 + 1) % this.m_m4.length];
	}
	,__class__: haxor.context.DataContext
};
haxor.context.EngineContext = function() { };
$hxClasses["haxor.context.EngineContext"] = haxor.context.EngineContext;
haxor.context.EngineContext.__name__ = ["haxor","context","EngineContext"];
haxor.context.EngineContext.Initialize = function() {
	haxor.core.Console.Log("Haxor> Engine Context Initialize.",3);
	haxor.context.EngineContext.update = new haxor.context.Process("process.update",haxor.context.EngineContext.maxNodes);
	haxor.context.EngineContext.render = new haxor.context.Process("process.render",haxor.context.EngineContext.maxNodes);
	haxor.context.EngineContext.resize = new haxor.context.Process("process.resize",haxor.context.EngineContext.maxNodes);
	haxor.context.EngineContext.resources = new haxor.context.Process("process.resources",haxor.context.EngineContext.maxNodes);
	haxor.context.EngineContext.disposables = new haxor.context.Process("process.disposables",haxor.context.EngineContext.maxNodes);
	haxor.context.EngineContext.list = [haxor.context.EngineContext.update,haxor.context.EngineContext.render,haxor.context.EngineContext.resize,haxor.context.EngineContext.resources,haxor.context.EngineContext.disposables];
	haxor.context.EngineContext.data = new haxor.context.DataContext();
	haxor.context.EngineContext.renderer = new haxor.context.RendererContext();
	haxor.context.EngineContext.mesh = new haxor.context.MeshContext();
	haxor.context.EngineContext.material = new haxor.context.MaterialContext();
	haxor.context.EngineContext.texture = new haxor.context.TextureContext();
	haxor.context.EngineContext.gizmo = new haxor.context.GizmoContext();
	haxor.context.EngineContext.camera = new haxor.context.CameraContext();
	haxor.context.EngineContext.transform = new haxor.context.TransformContext();
};
haxor.context.EngineContext.Build = function() {
	haxor.context.EngineContext.mesh.Initialize();
	haxor.context.EngineContext.material.Initialize();
	haxor.context.EngineContext.texture.Initialize();
	haxor.context.EngineContext.gizmo.Initialize();
	haxor.context.EngineContext.transform.Initialize();
	haxor.context.EngineContext.renderer.Initialize();
};
haxor.context.EngineContext.Enable = function(p_resource) {
	if(js.Boot.__instanceof(p_resource,haxor.core.IUpdateable)) haxor.context.EngineContext.update.Add(p_resource);
	if(js.Boot.__instanceof(p_resource,haxor.core.IRenderable)) haxor.context.EngineContext.render.Add(p_resource);
	if(js.Boot.__instanceof(p_resource,haxor.core.IResizeable)) haxor.context.EngineContext.resize.Add(p_resource);
	if(js.Boot.__instanceof(p_resource,haxor.component.Renderer)) haxor.context.EngineContext.renderer.Enable(p_resource);
	if(js.Boot.__instanceof(p_resource,haxor.core.Entity)) {
		var e = p_resource;
		var _g1 = 0;
		var _g = e.m_components.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = e.m_components[i];
			if(js.Boot.__instanceof(c,haxor.component.MeshRenderer)) haxor.context.EngineContext.renderer.Enable(c);
		}
	}
};
haxor.context.EngineContext.Disable = function(p_resource) {
	if(js.Boot.__instanceof(p_resource,haxor.core.IUpdateable)) haxor.context.EngineContext.update.Remove(p_resource);
	if(js.Boot.__instanceof(p_resource,haxor.core.IRenderable)) haxor.context.EngineContext.render.Remove(p_resource);
	if(js.Boot.__instanceof(p_resource,haxor.core.IResizeable)) haxor.context.EngineContext.resize.Remove(p_resource);
	if(js.Boot.__instanceof(p_resource,haxor.component.Renderer)) haxor.context.EngineContext.renderer.Disable(p_resource);
	if(js.Boot.__instanceof(p_resource,haxor.core.Entity)) {
		var e = p_resource;
		var _g1 = 0;
		var _g = e.m_components.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = e.m_components[i];
			if(js.Boot.__instanceof(c,haxor.component.MeshRenderer)) haxor.context.EngineContext.renderer.Disable(c);
		}
	}
};
haxor.context.EngineContext.OnEntiyLayerChange = function(p_entity,p_from,p_to) {
	var e = p_entity;
	var _g1 = 0;
	var _g = e.m_components.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = e.m_components[i];
		if(js.Boot.__instanceof(c,haxor.component.Renderer)) haxor.context.EngineContext.renderer.OnLayerChange(c,p_from,p_to);
	}
};
haxor.context.EngineContext.Destroy = function(p_resource) {
	if(p_resource.m_destroyed) return;
	p_resource.m_destroyed = true;
	var _g1 = 0;
	var _g = haxor.context.EngineContext.list.length;
	while(_g1 < _g) {
		var i = _g1++;
		haxor.context.EngineContext.list[i].Remove(p_resource);
	}
	haxor.context.EngineContext.disposables.Add(p_resource);
};
haxor.context.GizmoContext = function() {
};
$hxClasses["haxor.context.GizmoContext"] = haxor.context.GizmoContext;
haxor.context.GizmoContext.__name__ = ["haxor","context","GizmoContext"];
haxor.context.GizmoContext.prototype = {
	Initialize: function() {
		var mat;
		mat = this.gizmo_material = new haxor.graphics.material.Material("$GizmoMaterial");
		mat.set_shader(new haxor.graphics.material.Shader(haxor.context.ShaderContext.gizmo_source));
		mat.blend = true;
		mat.SetBlending(770,771);
		mat.SetFloat("Area",1000.0);
		mat.SetColor("Tint",new haxor.math.Color(1.0,1.0,1.0,0.4));
		mat.ztest = false;
		mat = this.texture_material = new haxor.graphics.material.Material("$TextureMaterial");
		mat.set_shader(new haxor.graphics.material.Shader(haxor.context.ShaderContext.texture_source));
		mat.blend = true;
		mat.SetBlending(770,771);
		mat.SetFloat2("Screen",haxor.graphics.Screen.m_width,haxor.graphics.Screen.m_height);
		mat.SetFloat4("Rect",0,0,100,100);
		mat.SetColor("Tint",new haxor.math.Color(1.0,1.0,1.0,1.0));
		mat.cull = 0;
		mat.ztest = false;
		this.CreateAxis();
		this.CreateGrid(100.0);
		this.CreateTextureQuad();
	}
	,CreateTextureQuad: function() {
		var m = this.texture = new haxor.graphics.mesh.Mesh("$TextureQuad");
		var vl;
		vl = haxor.io.FloatArray.Alloc([0,0,0,0,-1,0,1,-1,0,0,0,0,1,-1,0,1,0,0]);
		m.Set("vertex",vl,3);
		m.set_bounds(m.GenerateAttribBounds("vertex",haxor.context.EngineContext.data.get_aabb3()));
	}
	,CreateAxis: function() {
		var m = this.axis = new haxor.graphics.mesh.Mesh("$GridAxis");
		m.primitive = 1;
		var vl = new haxor.io.FloatArray(18);
		var cl = new haxor.io.FloatArray(24);
		var k;
		k = 0;
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,1.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,1.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,0.0);
		vl.Set(k++,1.0);
		k = 0;
		cl.Set(k++,1.0);
		cl.Set(k++,0.0);
		cl.Set(k++,0.0);
		cl.Set(k++,1.0);
		cl.Set(k++,1.0);
		cl.Set(k++,0.3);
		cl.Set(k++,0.3);
		cl.Set(k++,1.0);
		cl.Set(k++,0.0);
		cl.Set(k++,1.0);
		cl.Set(k++,0.0);
		cl.Set(k++,1.0);
		cl.Set(k++,0.3);
		cl.Set(k++,1.0);
		cl.Set(k++,0.3);
		cl.Set(k++,1.0);
		cl.Set(k++,0.0);
		cl.Set(k++,0.0);
		cl.Set(k++,1.0);
		cl.Set(k++,1.0);
		cl.Set(k++,0.3);
		cl.Set(k++,0.3);
		cl.Set(k++,1.0);
		cl.Set(k++,1.0);
		m.Set("vertex",vl,3);
		m.Set("color",cl,4);
		m.set_bounds(m.GenerateAttribBounds("vertex",haxor.context.EngineContext.data.get_aabb3()));
	}
	,CreateGrid: function(p_step) {
		this.grid = new haxor.graphics.mesh.Mesh("$GridMesh");
		this.grid.primitive = 1;
		var len = p_step + 1;
		p_step = 1.0 / p_step;
		var ox = 0.5;
		var oz = 0.5;
		var px = 0.0;
		var pz = 0.0;
		var vl = new haxor.io.FloatArray(12 * len);
		var k;
		k = 0;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			vl.Set(k++,px - ox);
			vl.Set(k++,0.0);
			vl.Set(k++,oz);
			vl.Set(k++,px - ox);
			vl.Set(k++,0.0);
			vl.Set(k++,-oz);
			px += p_step;
		}
		var _g1 = 0;
		while(_g1 < len) {
			var i1 = _g1++;
			vl.Set(k++,ox);
			vl.Set(k++,0.0);
			vl.Set(k++,pz - oz);
			vl.Set(k++,-ox);
			vl.Set(k++,0.0);
			vl.Set(k++,pz - oz);
			pz += p_step;
		}
		this.grid.Set("vertex",vl,3);
		this.grid.set_bounds(this.grid.GenerateAttribBounds("vertex",haxor.context.EngineContext.data.get_aabb3()));
	}
	,DrawGrid: function(p_area,p_color) {
		this.gizmo_material.SetFloat("Area",p_area);
		if(p_color != null) this.gizmo_material.SetFloat4("Tint",p_color.r,p_color.g,p_color.b,p_color.a);
		haxor.graphics.Graphics.Render(this.grid,this.gizmo_material,null,haxor.component.Camera.m_main);
	}
	,DrawAxis: function(p_area) {
		this.gizmo_material.SetFloat("Area",p_area);
		this.gizmo_material.SetColor("Tint",haxor.context.EngineContext.data.get_c().Set(1,1,1,1));
		haxor.graphics.Graphics.Render(this.axis,this.gizmo_material,null,haxor.component.Camera.m_main);
	}
	,__class__: haxor.context.GizmoContext
};
haxor.context.MaterialContext = function() {
	this.uniform_globals = ["ViewMatrix","ProjectionMatrix","WorldMatrix","WorldMatrixInverse","WorldMatrixIT","Time","RandomSeed","RandomTexture","ScreenTexture","ScreenDepth","Ambient","CameraPosition","ProjectionMatrixInverse","ViewMatrixInverse"];
	this.mid = new haxor.context.UID();
	this.sid = new haxor.context.UID();
	this.uid = new haxor.context.UID();
	this.zfunc = 515;
	this.ztest = true;
	this.zwrite = true;
	this.blend = false;
	this.blendSrc = 1;
	this.blendDst = 0;
	this.invert = false;
	this.cull = 2;
	var max_buffers = 512;
	var max_programs = 1024;
	this.locations = [];
	this.uniforms = [];
	this.programs = [];
	this.vertex_shaders = [];
	this.fragment_shaders = [];
	this.globals = [];
	this.camera = [];
	this.transform = [];
	this.slot = 0;
	this.viewmatrix = [];
	this.projmatrix = [];
	var _g = 0;
	while(_g < max_programs) {
		var i = _g++;
		var l = [];
		var ul = [];
		var _g1 = 0;
		while(_g1 < max_buffers) {
			var j = _g1++;
			l.push(-1);
		}
		var _g11 = 0;
		while(_g11 < 200) {
			var j1 = _g11++;
			ul.push(haxor.graphics.GL.INVALID);
		}
		this.camera.push(null);
		this.transform.push(null);
		this.globals.push([]);
		this.locations.push(l);
		this.uniforms.push(ul);
		this.programs.push(haxor.graphics.GL.INVALID);
		this.vertex_shaders.push(haxor.graphics.GL.INVALID);
		this.fragment_shaders.push(haxor.graphics.GL.INVALID);
		this.viewmatrix.push(false);
		this.projmatrix.push(false);
	}
};
$hxClasses["haxor.context.MaterialContext"] = haxor.context.MaterialContext;
haxor.context.MaterialContext.__name__ = ["haxor","context","MaterialContext"];
haxor.context.MaterialContext.prototype = {
	Initialize: function() {
		haxor.graphics.GL.m_gl.DepthFunc(515);
		haxor.graphics.GL.m_gl.Enable(2929);
		haxor.graphics.GL.m_gl.DepthMask(true);
		haxor.graphics.GL.m_gl.Disable(3042);
		haxor.graphics.GL.m_gl.BlendFunc(1,0);
		haxor.graphics.GL.m_gl.Enable(2884);
		haxor.graphics.GL.m_gl.FrontFace(2305);
		haxor.graphics.GL.m_gl.CullFace(1029);
		haxor.graphics.GL.m_gl.Enable(3089);
	}
	,UpdateFlags: function(m) {
		if(m.zfunc != this.zfunc) {
			this.zfunc = m.zfunc;
			haxor.graphics.GL.m_gl.DepthFunc(this.zfunc);
		}
		if(m.ztest != this.ztest) {
			this.ztest = m.ztest;
			if(this.ztest) haxor.graphics.GL.m_gl.Enable(2929); else haxor.graphics.GL.m_gl.Disable(2929);
		}
		if(m.zwrite != this.zwrite) {
			this.zwrite = m.zwrite;
			haxor.graphics.GL.m_gl.DepthMask(this.zwrite);
		}
		if(m.blend != this.blend) {
			this.blend = m.blend;
			if(this.blend) haxor.graphics.GL.m_gl.Enable(3042); else haxor.graphics.GL.m_gl.Disable(3042);
		}
		var blend_change = false;
		if(m.blendSrc != this.blendSrc) {
			blend_change = true;
			this.blendSrc = m.blendSrc;
		}
		if(m.blendDst != this.blendDst) {
			blend_change = true;
			this.blendDst = m.blendDst;
		}
		if(blend_change) haxor.graphics.GL.m_gl.BlendFunc(this.blendSrc,this.blendDst);
		if(m.invert != this.invert) {
			this.invert = m.invert;
			haxor.graphics.GL.m_gl.FrontFace(this.invert?2304:2305);
		}
		if(m.cull != this.cull) {
			this.cull = m.cull;
			if(this.cull == 0) haxor.graphics.GL.m_gl.Disable(2884); else {
				haxor.graphics.GL.m_gl.Enable(2884);
				haxor.graphics.GL.m_gl.CullFace(this.cull == 1?1028:1029);
			}
		}
	}
	,InitializeMaterial: function(m) {
		this.programs[m.__cid] = haxor.graphics.GL.m_gl.CreateProgram();
	}
	,InitializeShader: function(s) {
		if(js.Boot.__instanceof(s,haxor.graphics.material.UberShader)) return;
		var vs_err = "";
		var fs_err = "";
		vs_err = this.CreateCompileShader(s,35633,this.vertex_shaders);
		fs_err = this.CreateCompileShader(s,35632,this.fragment_shaders);
		if(s.m_hasError) {
			haxor.core.Console.LogError("Shader> Compile Error @ [" + s.get_name() + "]");
			haxor.core.Console.Log("[vertex]\n" + vs_err);
			haxor.core.Console.Log("[fragment]\n" + fs_err);
		}
	}
	,CreateUniform: function(m,u) {
		var p = this.programs[m.__cid];
		var loc = haxor.graphics.GL.m_gl.GetUniformLocation(p,u.name);
		this.uniforms[m.__cid][u.__cid] = loc;
		u.__d = true;
		u.exists = loc != haxor.graphics.GL.INVALID;
	}
	,DestroyUniform: function(m,u) {
		if(m != null) this.uniforms[m.__cid][u.__cid] = haxor.graphics.GL.INVALID;
		haxor.context.EngineContext.material.uid.set_id(u.__cid);
	}
	,CreateCompileShader: function(s,t,c) {
		var id = haxor.graphics.GL.m_gl.CreateShader(t);
		var ss;
		if(t == 35633) ss = s.m_vss; else ss = s.m_fss;
		c[s.__cid] = id;
		haxor.graphics.GL.m_gl.ShaderSource(id,ss);
		haxor.graphics.GL.m_gl.CompileShader(id);
		if(haxor.graphics.GL.m_gl.GetShaderParameter(id,35713) == 0) {
			s.m_hasError = true;
			return haxor.graphics.GL.m_gl.GetShaderInfoLog(id);
		}
		return "";
	}
	,UpdateShader: function(m,s0,s1) {
		var p = this.programs[m.__cid];
		var vs_id;
		var fs_id;
		if(s0 != null) {
			vs_id = this.vertex_shaders[s0.__cid];
			fs_id = this.fragment_shaders[s0.__cid];
			haxor.graphics.GL.m_gl.DetachShader(p,vs_id);
			haxor.graphics.GL.m_gl.DetachShader(p,fs_id);
		}
		if(s1 != null) {
			vs_id = this.vertex_shaders[s1.__cid];
			fs_id = this.fragment_shaders[s1.__cid];
			haxor.graphics.GL.m_gl.AttachShader(p,vs_id);
			haxor.graphics.GL.m_gl.AttachShader(p,fs_id);
			var al = haxor.context.EngineContext.mesh.attribs;
			var _g1 = 0;
			var _g = al.length;
			while(_g1 < _g) {
				var i = _g1++;
				haxor.graphics.GL.m_gl.BindAttribLocation(p,i,al[i]);
			}
			haxor.graphics.GL.m_gl.LinkProgram(p);
			if(haxor.graphics.GL.m_gl.GetProgramParameter(p,35714) == 0) haxor.core.Console.LogError("Material> [" + m.get_name() + "] Link Error @ [" + s1.get_name() + "]");
			var ul = m.m_uniforms;
			var _g11 = 0;
			var _g2 = ul.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				this.CreateUniform(m,ul[i1]);
			}
			var _g12 = 0;
			var _g3 = this.locations[m.__cid].length;
			while(_g12 < _g3) {
				var i2 = _g12++;
				this.locations[m.__cid][i2] = -1;
			}
		}
		var gl = this.uniform_globals.slice();
		var k = 0;
		var m4 = haxor.context.EngineContext.data.get_m4().SetIdentity();
		while(k < gl.length) {
			var un = gl[k];
			if(haxor.graphics.GL.m_gl.GetUniformLocation(p,un) == haxor.graphics.GL.INVALID) {
				HxOverrides.remove(gl,un);
				continue;
			}
			switch(un) {
			case "Ambient":
				m.SetColor(un,haxor.context.EngineContext.data.get_c().Set(1,1,1,1));
				break;
			case "Time":
				m.SetFloat(un,0.0);
				break;
			case "RandomSeed":
				m.SetFloat(un,0.0);
				break;
			case "WorldMatrix":
				m.SetMatrix4(un,m4);
				break;
			case "WorldMatrixInverse":
				m.SetMatrix4(un,m4);
				break;
			case "WorldMatrixIT":
				m.SetMatrix4(un,m4);
				break;
			case "CameraPosition":
				m.SetVector3(un,haxor.context.EngineContext.data.get_v3().Set(0,0,0));
				break;
			case "ViewMatrix":
				m.SetMatrix4(un,m4);
				break;
			case "ViewMatrixInverse":
				m.SetMatrix4(un,m4);
				break;
			case "ProjectionMatrix":
				m.SetMatrix4(un,m4);
				break;
			case "ProjectionMatrixInverse":
				m.SetMatrix4(un,m4);
				break;
			}
			k++;
		}
		this.globals[m.__cid] = gl;
	}
	,UpdateMaterial: function(m) {
	}
	,GetAttribLocation: function(a) {
		if(this.current == null) return -1;
		var p = this.programs[this.current.__cid];
		var loc = this.locations[this.current.__cid][a.__cid];
		if(loc == -1) {
			loc = haxor.graphics.GL.m_gl.GetAttribLocation(p,a.m_name);
			if(loc < 0) this.locations[this.current.__cid][a.__cid] = -2;
		}
		return loc;
	}
	,Bind: function(m,t,c) {
		var material_change = m != this.current;
		this.UseMaterial(m);
		this.UpdateMaterialUniforms(t,c,material_change);
	}
	,UseMaterial: function(m) {
		if(m != this.current) {
			this.Unbind();
			this.current = m;
			if(m != null) {
				this.viewmatrix[m.__cid] = false;
				this.projmatrix[m.__cid] = false;
				var p = this.programs[m.__cid];
				this.UpdateFlags(m);
				haxor.graphics.GL.m_gl.UseProgram(p);
			}
		}
	}
	,UpdateMaterialUniforms: function(t,c,p_changed) {
		if(this.current != null) {
			if(c == null) this.viewmatrix[this.current.__cid] = false; else this.viewmatrix[this.current.__cid] = c.m_view_uniform_dirty;
			if(c == null) this.projmatrix[this.current.__cid] = false; else this.projmatrix[this.current.__cid] = c.m_proj_uniform_dirty;
			if(t == null) t = haxor.component.Transform.get_root(); else t = t;
			var ut = t != this.transform[this.current.__cid];
			if(this.transform[this.current.__cid] != null) this.transform[this.current.__cid].m_uniform_dirty = false;
			this.transform[this.current.__cid] = t;
			ut = ut || t.m_uniform_dirty;
			var uc = c != this.camera[this.current.__cid] && c != null;
			var ucv = this.viewmatrix[this.current.__cid] || uc;
			var ucp = this.projmatrix[this.current.__cid] || uc;
			if(c != null) this.camera[this.current.__cid] = c;
			this.UploadUniforms(ut,ucv,ucp,t,c);
			this.viewmatrix[this.current.__cid] = false;
			this.projmatrix[this.current.__cid] = false;
		}
	}
	,UploadUniforms: function(ut,ucv,ucp,t,c) {
		var ul = this.current.m_uniforms;
		var _g1 = 0;
		var _g = ul.length;
		while(_g1 < _g) {
			var i = _g1++;
			var u = ul[i];
			this.UploadGlobalUniform(u,ut,ucv,ucp,t,c);
			this.UploadUniform(this.current,u);
		}
	}
	,UploadUniform: function(m,u) {
		var loc;
		loc = this.uniforms[m.__cid][u.__cid];
		if(loc == haxor.graphics.GL.INVALID) return;
		if(u.texture != null) haxor.context.EngineContext.texture.Bind(u.texture);
		if(!u.__d) return;
		this.ApplyUniform(loc,u);
	}
	,ApplyUniform: function(loc,u) {
		var off = u.offset;
		if(u.isFloat) {
			var b = u.data;
			switch(off) {
			case 1:
				haxor.graphics.GL.Uniform1f(loc,b.Get(0));
				break;
			case 2:
				haxor.graphics.GL.Uniform2f(loc,b.Get(0),b.Get(1));
				break;
			case 3:
				haxor.graphics.GL.Uniform3f(loc,b.Get(0),b.Get(1),b.Get(2));
				break;
			case 4:
				haxor.graphics.GL.Uniform4f(loc,b.Get(0),b.Get(1),b.Get(2),b.Get(3));
				break;
			case 16:
				haxor.graphics.GL.m_gl.UniformMatrix4fv(loc,false,b);
				break;
			default:
				haxor.graphics.GL.m_gl.Uniform1fv(loc,b);
			}
		} else {
			var b1 = u.data;
			switch(off) {
			case 1:
				haxor.graphics.GL.Uniform1i(loc,b1.Get(0));
				break;
			case 2:
				haxor.graphics.GL.Uniform2i(loc,b1.Get(0),b1.Get(1));
				break;
			case 3:
				haxor.graphics.GL.Uniform3i(loc,b1.Get(0),b1.Get(1),b1.Get(2));
				break;
			case 4:
				haxor.graphics.GL.Uniform4i(loc,b1.Get(0),b1.Get(1),b1.Get(2),b1.Get(3));
				break;
			default:
				haxor.graphics.GL.m_gl.Uniform1iv(loc,b1);
			}
		}
		u.__d = false;
	}
	,UploadGlobalUniform: function(u,ut,ucv,ucp,t,c) {
		var _g = u.name;
		switch(_g) {
		case "Ambient":
			u.SetColor(haxor.component.Light.ambient);
			break;
		case "Time":
			u.SetFloat(haxor.core.Time.m_elapsed);
			break;
		case "RandomSeed":
			u.SetFloat(Math.random());
			break;
		case "WorldMatrix":
			if(ut) u.SetMatrix4(t.get_WorldMatrix());
			break;
		case "WorldMatrixInverse":
			if(ut) u.SetMatrix4(t.get_WorldMatrixInverse());
			break;
		case "WorldMatrixIT":
			if(ut) u.SetMatrix4(t.get_WorldMatrixInverse(),true);
			break;
		case "CameraPosition":
			if(ucv) u.SetVector3(c.m_entity.m_transform.get_position());
			break;
		case "ViewMatrix":
			if(ucv) u.SetMatrix4(c.m_entity.m_transform.get_WorldMatrixInverse());
			break;
		case "ViewMatrixInverse":
			if(ucv) u.SetMatrix4(c.m_entity.m_transform.get_WorldMatrix());
			break;
		case "ProjectionMatrix":
			if(ucp) u.SetMatrix4((function($this) {
				var $r;
				c.UpdateProjection();
				$r = c.m_projectionMatrix;
				return $r;
			}(this)));
			break;
		case "ProjectionMatrixInverse":
			if(ucp) u.SetMatrix4((function($this) {
				var $r;
				c.UpdateProjection();
				$r = c.m_projectionMatrixInverse;
				return $r;
			}(this)));
			break;
		}
	}
	,Unbind: function() {
	}
	,DestroyMaterial: function(m) {
		var p = this.programs[m.__cid];
		if(m.m_shader != null) {
			haxor.graphics.GL.m_gl.DetachShader(p,this.vertex_shaders[m.m_shader.__cid]);
			haxor.graphics.GL.m_gl.DetachShader(p,this.fragment_shaders[m.m_shader.__cid]);
		}
		haxor.graphics.GL.m_gl.DeleteProgram(p);
		haxor.context.EngineContext.material.mid.set_id(m.__cid);
		var _g1 = 0;
		var _g = m.m_uniforms.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.uid.set_id(m.m_uniforms[i].__cid);
		}
	}
	,DestroyShader: function(s) {
		haxor.graphics.GL.m_gl.DeleteShader(this.vertex_shaders[s.__cid]);
		haxor.graphics.GL.m_gl.DeleteShader(this.fragment_shaders[s.__cid]);
		haxor.context.EngineContext.material.sid.set_id(s.__cid);
	}
	,__class__: haxor.context.MaterialContext
};
haxor.context.MeshContext = function() {
	this.attribs = ["vertex","normal","uv0","uv1","uv2","color","weight","bone"];
	this.aid = new haxor.context.UID();
	this.mid = new haxor.context.UID();
	this.buffers = [];
	this.activated = [];
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		this.activated.push(false);
	}
	var max_buffers = 512;
	var _g1 = 0;
	while(_g1 < max_buffers) {
		var i1 = _g1++;
		this.buffers.push(haxor.graphics.GL.INVALID);
	}
};
$hxClasses["haxor.context.MeshContext"] = haxor.context.MeshContext;
haxor.context.MeshContext.__name__ = ["haxor","context","MeshContext"];
haxor.context.MeshContext.prototype = {
	Initialize: function() {
		haxor.core.Console.Log("MeshContext> Initialize.",3);
	}
	,Bind: function(p_mesh) {
		if(p_mesh != this.current) {
			this.Unbind();
			this.current = p_mesh;
			if(this.current != null) this.ActivateAttributes();
		}
	}
	,ActivateAttributes: function() {
		var a;
		var al = this.current.m_attribs;
		var id;
		var type;
		var has_color = false;
		var _g1 = 0;
		var _g = al.length;
		while(_g1 < _g) {
			var i = _g1++;
			a = al[i];
			var loc = a._loc_;
			if(loc == 5) has_color = true;
			if(loc < 0) {
				loc = haxor.context.EngineContext.material.GetAttribLocation(a);
				if(loc < 0) continue;
			}
			type = 5126;
			if(!this.activated[loc]) {
				this.activated[loc] = true;
				this.active_max = Math.max(this.active_max,loc);
				haxor.graphics.GL.m_gl.EnableVertexAttrib(loc);
			}
			haxor.graphics.GL.m_gl.BindBuffer(34962,this.buffers[a.__cid]);
			haxor.graphics.GL.m_gl.VertexAttribPointer(loc,a.offset,type,false,0,0);
		}
		if(!has_color) {
			if(this.activated[5]) {
				haxor.graphics.GL.m_gl.DisableVertexAttrib(5);
				this.activated[5] = false;
			}
			haxor.graphics.GL.m_gl.VertexAttrib4f(5,1.0,1.0,1.0,1.0);
		}
		if(this.current.m_indexed) {
			a = this.current.m_topology_attrib;
			haxor.graphics.GL.m_gl.BindBuffer(34963,this.buffers[a.__cid]);
		}
	}
	,Unbind: function() {
	}
	,Draw: function(m) {
		if(m.m_indexed) haxor.graphics.GL.m_gl.DrawElements(m.primitive,m.m_topology_attrib.data.m_length,5123,0); else haxor.graphics.GL.m_gl.DrawArrays(m.primitive,0,m.m_vcount);
	}
	,RemoveAttrib: function(p_attrib) {
		var id = this.buffers[p_attrib.__cid];
		if(id == haxor.graphics.GL.INVALID) return;
		haxor.graphics.GL.m_gl.DeleteBuffer(id);
		this.buffers[p_attrib.__cid] = haxor.graphics.GL.INVALID;
		this.aid.set_id(p_attrib.__cid);
	}
	,UpdateAttrib: function(a,p_mode,p_is_index) {
		var id = this.buffers[a.__cid];
		var target_flag;
		if(p_is_index) target_flag = 34963; else target_flag = 34962;
		a._loc_ = HxOverrides.indexOf(this.attribs,a.m_name,0);
		if(id == haxor.graphics.GL.INVALID) {
			id = haxor.graphics.GL.m_gl.CreateBuffer();
			this.buffers[a.__cid] = id;
		}
		haxor.graphics.GL.m_gl.BindBuffer(target_flag,id);
		haxor.graphics.GL.m_gl.BufferData(target_flag,a.data,p_mode);
	}
	,__class__: haxor.context.MeshContext
};
haxor.context.BaseProcess = function(p_name,p_update_cid) {
	if(p_update_cid == null) p_update_cid = true;
	this.name = p_name;
	this.__cid = haxor.context.BaseProcess.m_cid;
	haxor.core.Console.Log("\tProcess [" + p_name + "][" + this.__cid + "] created.",8);
	if(p_update_cid) haxor.context.BaseProcess.m_cid++;
};
$hxClasses["haxor.context.BaseProcess"] = haxor.context.BaseProcess;
haxor.context.BaseProcess.__name__ = ["haxor","context","BaseProcess"];
haxor.context.BaseProcess.prototype = {
	get_length: function() {
		return 0;
	}
	,Add: function(p_item) {
	}
	,Remove: function(p_item) {
		return null;
	}
	,Clear: function() {
	}
	,__class__: haxor.context.BaseProcess
};
haxor.context.Process = function(p_name,p_size,p_update_cid) {
	if(p_update_cid == null) p_update_cid = true;
	haxor.context.BaseProcess.call(this,p_name,p_update_cid);
	this.list = [];
	this.m_length = 0;
	var _g = 0;
	while(_g < p_size) {
		var i = _g++;
		this.list.push(null);
	}
};
$hxClasses["haxor.context.Process"] = haxor.context.Process;
haxor.context.Process.__name__ = ["haxor","context","Process"];
haxor.context.Process.__super__ = haxor.context.BaseProcess;
haxor.context.Process.prototype = $extend(haxor.context.BaseProcess.prototype,{
	get_length: function() {
		return this.m_length;
	}
	,Add: function(p_item) {
		var iid = p_item.__pid[this.__cid];
		if(iid >= 0) return;
		if(this.m_length >= this.list.length) this.list.push(null);
		this.list[this.m_length] = p_item;
		p_item.__pid[this.__cid] = this.m_length++;
	}
	,Remove: function(p_item) {
		var iid = p_item.__pid[this.__cid];
		if(iid < 0) return p_item;
		p_item.__pid[this.__cid] = -1;
		this.m_length--;
		if(this.m_length <= 0) return p_item;
		this.list[iid] = this.list[this.m_length];
		p_item = this.list[iid];
		p_item.__pid[this.__cid] = iid;
		return p_item;
	}
	,Swap: function(p_a,p_b,p_index_only) {
		if(p_index_only == null) p_index_only = false;
		var ra = p_a;
		var rb = p_b;
		var ia = ra.__pid[this.__cid];
		if(ia < 0) return;
		var ib = rb.__pid[this.__cid];
		if(ib < 0) return;
		if(!p_index_only) {
			this.list[ia] = p_b;
			this.list[ib] = p_a;
		}
		rb.__pid[this.__cid] = ia;
		ra.__pid[this.__cid] = ib;
	}
	,Clear: function() {
		this.m_length = 0;
		this.list = [];
	}
	,Sort: function(p_method) {
		this.list.sort(p_method);
		var _g1 = 0;
		var _g = this.m_length;
		while(_g1 < _g) {
			var i = _g1++;
			var it = this.list[i];
			if(it != null) it.__pid[this.__cid] = i;
		}
	}
	,ToString: function() {
		var log = "";
		var _g1 = 0;
		var _g = this.m_length;
		while(_g1 < _g) {
			var i = _g1++;
			var it = this.list[i];
			log += "[" + it.get_name() + "," + it.__pid[this.__cid] + "]";
		}
		return log;
	}
	,__class__: haxor.context.Process
});
haxor.context.RendererContext = function() {
	this.rid = new haxor.context.UID();
	this.fcid = new haxor.context.UID();
	this.sap = new haxor.ds.SAP(0.01,false);
	this.sap_dirty = false;
	this.deferred_culling = 0;
	this.deferred_offset = 100;
	this.display = [];
	this.sort = [];
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		var p = new haxor.context.Process("process.renderers",haxor.context.EngineContext.maxNodes,i == 31);
		this.display.push(p);
		this.sort.push(false);
	}
};
$hxClasses["haxor.context.RendererContext"] = haxor.context.RendererContext;
haxor.context.RendererContext.__name__ = ["haxor","context","RendererContext"];
haxor.context.RendererContext.prototype = {
	Initialize: function() {
		this.skinning = new haxor.graphics.texture.ComputeTexture(512,512,haxor.core.PixelFormat.Float4);
	}
	,Create: function(r) {
		r.__cid = this.rid.get_id();
		if(r.m_has_mesh) {
			var mr = r;
			mr.__fcid = this.fcid.get_id();
			this.sap.Create(mr.__fcid);
		}
	}
	,AddCamera: function(c) {
		c.__fcid = this.fcid.get_id();
		this.sap.Create(c.__fcid);
	}
	,RemoveCamera: function(c) {
		this.fcid.set_id(c.__fcid);
		this.sap.Remove(c.__fcid);
	}
	,OnMaterialChange: function(r) {
		var l = r.m_entity.m_layer;
		this.sort[l] = true;
	}
	,OnMeshChange: function(r) {
		var l = r.m_entity.m_layer;
		this.sort[l] = true;
	}
	,OnVisibilityChange: function(r,f) {
		var cl = r.m_entity.m_components;
		var _g1 = 0;
		var _g = cl.length;
		while(_g1 < _g) {
			var i = _g1++;
			cl[i].OnVisibilityChange(f);
		}
	}
	,DeferredCulling: function(r) {
		return false;
		if(!(r.m_visible && !r.m_culled)) return false;
		var c_id = haxor.context.EngineContext.renderer.deferred_culling;
		var c_off = this.deferred_offset;
		this.deferred_culling = (this.deferred_culling + this.deferred_offset) % this.rid.get_next();
		if(haxor.math.Mathf.AbsInt(c_id - r.__cid) > c_off) return true;
		return false;
	}
	,OnLayerChange: function(r,from,to) {
		this.sort[from] = true;
		this.display[from].Remove(r);
		if(r.get_enabled()) {
			this.display[to].Add(r);
			this.sort[to] = true;
		}
	}
	,UpdateDisplayList: function(c) {
		var ll = c.m_layers;
		var _g1 = 0;
		var _g = ll.length;
		while(_g1 < _g) {
			var i = _g1++;
			var l = ll[i];
			var rl = this.display[l];
			var need_sort = this.sort[l];
			if(need_sort) {
				this.sort[l] = false;
				if(rl.m_length > 1) rl.Sort($bind(this,this.DisplayListSort));
			}
		}
	}
	,Enable: function(r) {
		this.display[r.m_entity.m_layer].Add(r);
		this.sort[r.m_entity.m_layer] = true;
		if(r.m_has_mesh) {
			var mr = r;
			mr.m_culling_dirty = true;
		}
	}
	,Disable: function(r) {
		this.display[r.m_entity.m_layer].Remove(r);
		this.sort[r.m_entity.m_layer] = true;
	}
	,UpdateCameraSAP: function(c) {
		var need_sap = this.sap_dirty || c.m_view_uniform_dirty || c.m_proj_uniform_dirty;
		if(!need_sap) return;
		var n0 = haxor.context.EngineContext.data.get_v3().Set4(c.m_frustum[0]);
		var n1 = haxor.context.EngineContext.data.get_v3().Set4(c.m_frustum[1]);
		var n2 = haxor.context.EngineContext.data.get_v3().Set4(c.m_frustum[2]);
		var n3 = haxor.context.EngineContext.data.get_v3().Set4(c.m_frustum[3]);
		var f0 = haxor.context.EngineContext.data.get_v3().Set4(c.m_frustum[4]);
		var f1 = haxor.context.EngineContext.data.get_v3().Set4(c.m_frustum[5]);
		var f2 = haxor.context.EngineContext.data.get_v3().Set4(c.m_frustum[6]);
		var f3 = haxor.context.EngineContext.data.get_v3().Set4(c.m_frustum[7]);
		c.m_entity.m_transform.get_WorldMatrix().Transform3x4(n0);
		c.m_entity.m_transform.get_WorldMatrix().Transform3x4(n1);
		c.m_entity.m_transform.get_WorldMatrix().Transform3x4(n2);
		c.m_entity.m_transform.get_WorldMatrix().Transform3x4(n3);
		c.m_entity.m_transform.get_WorldMatrix().Transform3x4(f0);
		c.m_entity.m_transform.get_WorldMatrix().Transform3x4(f1);
		c.m_entity.m_transform.get_WorldMatrix().Transform3x4(f2);
		c.m_entity.m_transform.get_WorldMatrix().Transform3x4(f3);
		var pmin = haxor.context.EngineContext.data.get_v3().Set(n0.x,n0.y,n0.z);
		var pmax = haxor.context.EngineContext.data.get_v3().Set(n0.x,n0.y,n0.z);
		pmin.x = haxor.math.Mathf.Min(pmin.x,haxor.math.Mathf.Min(n1.x,Math.min(n2.x,n3.x)));
		pmin.y = haxor.math.Mathf.Min(pmin.y,haxor.math.Mathf.Min(n1.y,Math.min(n2.y,n3.y)));
		pmin.z = haxor.math.Mathf.Min(pmin.z,haxor.math.Mathf.Min(n1.z,Math.min(n2.z,n3.z)));
		pmax.x = haxor.math.Mathf.Max(pmax.x,haxor.math.Mathf.Max(n1.x,Math.max(n2.x,n3.x)));
		pmax.y = haxor.math.Mathf.Max(pmax.y,haxor.math.Mathf.Max(n1.y,Math.max(n2.y,n3.y)));
		pmax.z = haxor.math.Mathf.Max(pmax.z,haxor.math.Mathf.Max(n1.z,Math.max(n2.z,n3.z)));
		pmin.x = haxor.math.Mathf.Min(pmin.x,haxor.math.Mathf.Min(f0.x,haxor.math.Mathf.Min(f1.x,Math.min(f2.x,f3.x))));
		pmin.y = haxor.math.Mathf.Min(pmin.y,haxor.math.Mathf.Min(f0.y,haxor.math.Mathf.Min(f1.y,Math.min(f2.y,f3.y))));
		pmin.z = haxor.math.Mathf.Min(pmin.z,haxor.math.Mathf.Min(f0.z,haxor.math.Mathf.Min(f1.z,Math.min(f2.z,f3.z))));
		pmax.x = haxor.math.Mathf.Max(pmax.x,haxor.math.Mathf.Max(f0.x,haxor.math.Mathf.Max(f1.x,Math.max(f2.x,f3.x))));
		pmax.y = haxor.math.Mathf.Max(pmax.y,haxor.math.Mathf.Max(f0.y,haxor.math.Mathf.Max(f1.y,Math.max(f2.y,f3.y))));
		pmax.z = haxor.math.Mathf.Max(pmax.z,haxor.math.Mathf.Max(f0.z,haxor.math.Mathf.Max(f1.z,Math.max(f2.z,f3.z))));
		this.UpdateSAP(c.__fcid,c,pmin,pmax);
	}
	,UpdateSAP: function(p_id,p_d,p_min,p_max) {
		this.sap_dirty = true;
		this.sap.Update(p_id,p_d,p_min,p_max);
	}
	,IsSAPCulled: function(r,c) {
		if(!r.m_has_mesh) return false;
		var mr = r;
		return this.sap.Overlap(mr.__fcid,c.__fcid);
	}
	,Destroy: function(r) {
		this.display[r.m_entity.m_layer].Remove(r);
		this.sort[r.m_entity.m_layer] = true;
		this.rid.set_id(r.__cid);
		if(r.m_has_mesh) {
			var mr = r;
			this.fcid.set_id(mr.__fcid);
			this.sap.Remove(mr.__fcid);
		}
	}
	,DisplayListSort: function(a,b) {
		if(a == null) {
			if(b == null) return 0;
		}
		if(a == null) return 1;
		if(b == null) return -1;
		if(a.m_material == null) {
			if(b.m_material == null) return 0;
		}
		if(a.m_material == null) return 1;
		if(b.m_material == null) return -1;
		var ma = a.m_material;
		var mb = b.m_material;
		var ia = ma.queue;
		var ib = mb.queue;
		if(ia != ib) if(ia < ib) return -1; else return 1;
		if(!a.m_has_mesh) {
			if(!b.m_has_mesh) return 0;
		}
		if(!a.m_has_mesh) return 1;
		if(!b.m_has_mesh) return -1;
		var mra = a;
		var mrb = b;
		if(mra.m_material.get_uid() < mrb.m_material.get_uid()) return -1;
		if(mra.m_material.get_uid() > mrb.m_material.get_uid()) return 1;
		if(mra.m_mesh == null) {
			if(mrb.m_mesh == null) return 0;
		}
		if(mra.m_mesh == null) return 1;
		if(mrb.m_mesh == null) return -1;
		if(mra.m_mesh.get_uid() < mrb.m_mesh.get_uid()) return -1;
		if(mra.m_mesh.get_uid() > mrb.m_mesh.get_uid()) return 1;
		return 0;
	}
	,__class__: haxor.context.RendererContext
};
haxor.context.ShaderContext = function() { };
$hxClasses["haxor.context.ShaderContext"] = haxor.context.ShaderContext;
haxor.context.ShaderContext.__name__ = ["haxor","context","ShaderContext"];
haxor.context.TextureContext = function() {
	this.tid = new haxor.context.UID();
	this.bind = null;
	this.target = null;
	this.active = -1;
	this.next_slot = 0;
	this.bind = [];
	this.ids = [];
	this.framebuffers = [];
	this.renderbuffers = [];
};
$hxClasses["haxor.context.TextureContext"] = haxor.context.TextureContext;
haxor.context.TextureContext.__name__ = ["haxor","context","TextureContext"];
haxor.context.TextureContext.TextureToTarget = function(p_texture) {
	if(p_texture.get_type() == haxor.core.TextureType.Texture2D) return 3553;
	if(p_texture.get_type() == haxor.core.TextureType.RenderTexture) return 3553;
	if(p_texture.get_type() == haxor.core.TextureType.TextureCube) return 34067;
	return 3553;
};
haxor.context.TextureContext.FormatToChannelBits = function(p_format) {
	switch(p_format[1]) {
	case 0:
		return 6406;
	case 2:
		return 6407;
	case 3:
		return 6408;
	case 7:case 4:
		return 6409;
	case 8:case 5:
		return 6407;
	case 9:case 6:
		return 6408;
	case 1:
		return 6409;
	case 10:
		return 6402;
	}
	return 6408;
};
haxor.context.TextureContext.FormatToChannelType = function(p_format) {
	switch(p_format[1]) {
	case 4:case 5:case 6:
		return haxor.graphics.GL.HALF_FLOAT;
	case 7:case 8:case 9:
		return 5126;
	case 10:
		return 5123;
	case 3:case 2:case 1:case 0:
		return 5121;
	}
	return 5121;
};
haxor.context.TextureContext.FormatToChannelLayout = function(p_format) {
	switch(p_format[1]) {
	case 0:
		return 6406;
	case 2:
		return 6407;
	case 3:
		return 6408;
	case 1:case 4:case 7:
		return 6409;
	case 8:case 5:
		return 6407;
	case 9:case 6:
		return 6408;
	case 10:
		return 6402;
	}
	return 6408;
};
haxor.context.TextureContext.prototype = {
	Initialize: function() {
		var _g1 = 0;
		var _g = haxor.graphics.GL.MAX_ACTIVE_TEXTURE;
		while(_g1 < _g) {
			var i = _g1++;
			this.bind.push(null);
		}
		var _g2 = 0;
		while(_g2 < 2048) {
			var i1 = _g2++;
			this.ids.push(haxor.graphics.GL.INVALID);
			this.framebuffers.push(haxor.graphics.GL.INVALID);
			this.renderbuffers.push(haxor.graphics.GL.INVALID);
		}
	}
	,Alloc: function(p_texture) {
		var w = p_texture.m_width;
		var h = p_texture.m_height;
		var chn_fmt = haxor.context.TextureContext.FormatToChannelLayout(p_texture.m_format);
		var chn_bit = haxor.context.TextureContext.FormatToChannelBits(p_texture.m_format);
		var chn_type = haxor.context.TextureContext.FormatToChannelType(p_texture.m_format);
		var tex_type;
		if(p_texture.get_type() == haxor.core.TextureType.Texture2D) tex_type = 3553; else if(p_texture.get_type() == haxor.core.TextureType.RenderTexture) tex_type = 3553; else if(p_texture.get_type() == haxor.core.TextureType.TextureCube) tex_type = 34067; else tex_type = 3553;
		this.Bind(p_texture);
		haxor.graphics.GL.m_gl.TexImage2DAlloc(tex_type,0,chn_fmt,w,h,0,chn_bit,chn_type);
	}
	,Create: function(p_texture) {
		p_texture.__slot = this.next_slot % haxor.graphics.GL.MAX_ACTIVE_TEXTURE;
		this.next_slot++;
		var id = haxor.graphics.GL.m_gl.CreateTexture();
		this.ids[p_texture.__cid] = id;
		this.UpdateParameters(p_texture);
		if(p_texture.get_type() != haxor.core.TextureType.TextureCube) this.Alloc(p_texture);
		if(p_texture.get_type() == haxor.core.TextureType.RenderTexture) {
			var rt = p_texture;
			var fb_id = haxor.graphics.GL.m_gl.CreateFramebuffer();
			this.framebuffers[p_texture.__cid] = fb_id;
			haxor.graphics.GL.m_gl.BindFramebuffer(36160,fb_id);
			haxor.graphics.GL.m_gl.FramebufferTexture2D(36160,36064,3553,id,0);
			if(rt.m_depth != null) {
				var depth_id = this.ids[rt.m_depth.__cid];
				haxor.graphics.GL.m_gl.FramebufferTexture2D(36160,36096,3553,depth_id,0);
			} else {
				var rb_id = haxor.graphics.GL.m_gl.CreateRenderbuffer();
				this.renderbuffers[p_texture.__cid] = rb_id;
				haxor.graphics.GL.m_gl.BindRenderbuffer(36161,rb_id);
				haxor.graphics.GL.m_gl.RenderbufferStorage(36161,33189,rt.m_width,rt.m_height);
				haxor.graphics.GL.m_gl.FramebufferRenderbuffer(36160,36096,36161,rb_id);
			}
			haxor.graphics.GL.BindFramebuffer(36160,haxor.graphics.GL.NULL);
			haxor.graphics.GL.BindRenderbuffer(36161,haxor.graphics.GL.NULL);
			this.Unbind();
		}
	}
	,Bind: function(p_texture) {
		var slot = p_texture.__slot;
		haxor.graphics.GL.m_gl.ActiveTexture(33984 + slot);
		this.active = slot;
		var id = this.ids[p_texture.__cid];
		var target;
		if(p_texture.get_type() == haxor.core.TextureType.Texture2D) target = 3553; else if(p_texture.get_type() == haxor.core.TextureType.RenderTexture) target = 3553; else if(p_texture.get_type() == haxor.core.TextureType.TextureCube) target = 34067; else target = 3553;
		haxor.graphics.GL.m_gl.BindTexture(target,id);
		this.bind[slot] = p_texture;
	}
	,Unbind: function() {
		if(this.active < 0) return;
		if(this.bind[this.active] == null) return;
		var target = haxor.context.TextureContext.TextureToTarget(this.bind[this.active]);
		this.bind[this.active] = null;
		haxor.graphics.GL.BindTexture(3553,haxor.graphics.GL.NULL);
	}
	,UpdateParameters: function(p_texture) {
		var target;
		if(p_texture.get_type() == haxor.core.TextureType.Texture2D) target = 3553; else if(p_texture.get_type() == haxor.core.TextureType.RenderTexture) target = 3553; else if(p_texture.get_type() == haxor.core.TextureType.TextureCube) target = 34067; else target = 3553;
		this.Bind(p_texture);
		haxor.graphics.GL.m_gl.TexParameteri(target,10242,(p_texture.m_wrap & haxor.core.TextureWrap.ClampX) != 0?33071:10497);
		haxor.graphics.GL.m_gl.TexParameteri(target,10243,(p_texture.m_wrap & haxor.core.TextureWrap.ClampY) != 0?33071:10497);
		if(haxor.graphics.GL.TEXTURE_ANISOTROPY_ENABLED) haxor.graphics.GL.TexParameterf(target,haxor.graphics.GL.TEXTURE_ANISOTROPY,Math.max(1,p_texture.m_aniso));
		var minf = p_texture.m_minFilter;
		var magf = p_texture.m_magFilter;
		if(p_texture.m_format == haxor.core.PixelFormat.Half) {
			if(!haxor.graphics.GL.TEXTURE_HALF_LINEAR) {
				minf = haxor.core.TextureFilter.Nearest;
				magf = haxor.core.TextureFilter.Nearest;
			}
		}
		switch(minf[1]) {
		case 0:
			haxor.graphics.GL.m_gl.TexParameteri(target,10241,9728);
			break;
		case 3:
			haxor.graphics.GL.m_gl.TexParameteri(target,10241,9986);
			break;
		case 2:
			haxor.graphics.GL.m_gl.TexParameteri(target,10241,9984);
			break;
		case 1:
			haxor.graphics.GL.m_gl.TexParameteri(target,10241,9729);
			break;
		case 5:
			haxor.graphics.GL.m_gl.TexParameteri(target,10241,9987);
			break;
		case 6:
			haxor.graphics.GL.m_gl.TexParameteri(target,10241,9987);
			break;
		case 4:
			haxor.graphics.GL.m_gl.TexParameteri(target,10241,9985);
			break;
		}
		switch(magf[1]) {
		case 0:
			haxor.graphics.GL.m_gl.TexParameteri(target,10240,9728);
			break;
		case 3:
			haxor.graphics.GL.m_gl.TexParameteri(target,10240,9728);
			break;
		case 2:
			haxor.graphics.GL.m_gl.TexParameteri(target,10240,9728);
			break;
		case 1:
			haxor.graphics.GL.m_gl.TexParameteri(target,10240,9729);
			break;
		case 5:
			haxor.graphics.GL.m_gl.TexParameteri(target,10240,9729);
			break;
		case 6:
			haxor.graphics.GL.m_gl.TexParameteri(target,10240,9729);
			break;
		case 4:
			haxor.graphics.GL.m_gl.TexParameteri(target,10240,9729);
			break;
		}
	}
	,Update: function(p_texture) {
		var target;
		if(p_texture.get_type() == haxor.core.TextureType.Texture2D) target = 3553; else if(p_texture.get_type() == haxor.core.TextureType.RenderTexture) target = 3553; else if(p_texture.get_type() == haxor.core.TextureType.TextureCube) target = 34067; else target = 3553;
		this.Bind(p_texture);
		if(target == 34067) {
			var tc = p_texture;
			if(tc.m_faces[0] != null) this.WriteTexture(34069,tc.m_faces[0]);
			if(tc.m_faces[1] != null) this.WriteTexture(34070,tc.m_faces[1]);
			if(tc.m_faces[2] != null) this.WriteTexture(34071,tc.m_faces[2]);
			if(tc.m_faces[3] != null) this.WriteTexture(34072,tc.m_faces[3]);
			if(tc.m_faces[4] != null) this.WriteTexture(34073,tc.m_faces[4]);
			if(tc.m_faces[5] != null) this.WriteTexture(34074,tc.m_faces[5]);
		} else this.WriteTexture(target,p_texture);
	}
	,UploadTexture: function(p_texture,p_x,p_y,p_width,p_height,p_steps,p_on_complete) {
		var _g = this;
		var b = p_texture.m_data;
		var py = p_y;
		var chn_fmt = haxor.context.TextureContext.FormatToChannelLayout(p_texture.m_format);
		var chn_bit = haxor.context.TextureContext.FormatToChannelBits(p_texture.m_format);
		var chn_type = haxor.context.TextureContext.FormatToChannelType(p_texture.m_format);
		var steps = p_height / p_steps | 0;
		if(steps <= 1) steps = 1;
		var ua = new haxor.thread.Activity(function(t) {
			if(py >= p_height) {
				if(p_on_complete != null) p_on_complete();
				return false;
			}
			_g.Bind(p_texture);
			var _g1 = 0;
			while(_g1 < steps) {
				var i = _g1++;
				if(py < 0) {
					py++;
					continue;
				}
				if(py >= b.m_height) {
					if(p_on_complete != null) p_on_complete();
					return false;
				}
				var pos = (p_x + py * p_width) * b.m_channels;
				var len = p_width * b.m_channels;
				b.get_buffer().SetViewSlice(pos,len);
				haxor.graphics.GL.TexSubImage2D(3553,0,p_x,py,p_width,1,chn_fmt,chn_type,b.get_buffer());
				b.get_buffer().ResetSlice();
				py++;
			}
			return true;
		},false,true);
	}
	,WriteTexture: function(p_target,p_texture) {
		var w = p_texture.m_width;
		var h = p_texture.m_height;
		var chn_fmt = haxor.context.TextureContext.FormatToChannelLayout(p_texture.m_format);
		var chn_bit = haxor.context.TextureContext.FormatToChannelBits(p_texture.m_format);
		var chn_type = haxor.context.TextureContext.FormatToChannelType(p_texture.m_format);
		if(p_texture.m_format == haxor.core.PixelFormat.Depth) haxor.graphics.GL.m_gl.TexImage2DAlloc(p_target,0,chn_fmt,w,h,0,chn_fmt,chn_type); else {
			var is_ti2d = p_texture.get_type() == haxor.core.TextureType.Compute || p_texture.get_type() == haxor.core.TextureType.Texture2D;
			if(is_ti2d) {
				var t2d = p_texture;
				haxor.graphics.GL.TexImage2D(p_target,0,chn_fmt,w,h,0,chn_bit,chn_type,t2d.m_data.get_buffer());
			} else if(p_texture.get_type() == haxor.core.TextureType.RenderTexture) {
				var rt = p_texture;
				var id = this.ids[rt.__cid];
				haxor.graphics.GL.m_gl.FramebufferTexture2D(36160,36064,p_target,id,0);
			}
		}
	}
	,BindTarget: function(rt) {
		if(rt == null) {
			if(this.target != rt) {
				haxor.graphics.GL.BindFramebuffer(36160,haxor.graphics.GL.NULL);
				haxor.graphics.GL.BindRenderbuffer(36161,haxor.graphics.GL.NULL);
				this.target = null;
			}
		} else if(this.target != rt) {
			var fb_id = this.framebuffers[rt.__cid];
			haxor.graphics.GL.m_gl.BindFramebuffer(36160,fb_id);
			if(rt.m_depth == null) {
				var rb_id = this.renderbuffers[rt.__cid];
				haxor.graphics.GL.m_gl.BindRenderbuffer(36161,rb_id);
			}
			this.target = rt;
		}
	}
	,UpdateMipmaps: function(p_texture) {
		this.Bind(p_texture);
		var target;
		if(p_texture.get_type() == haxor.core.TextureType.Texture2D) target = 3553; else if(p_texture.get_type() == haxor.core.TextureType.RenderTexture) target = 3553; else if(p_texture.get_type() == haxor.core.TextureType.TextureCube) target = 34067; else target = 3553;
		haxor.graphics.GL.m_gl.GenerateMipmap(target);
	}
	,Destroy: function(p_texture) {
		var tex_id = this.ids[p_texture.__cid];
		if(tex_id != haxor.graphics.GL.INVALID) haxor.graphics.GL.m_gl.DeleteTexture(tex_id);
		if(p_texture.get_type() == haxor.core.TextureType.RenderTexture) {
			var fb_id = this.framebuffers[p_texture.__cid];
			var rb_id = this.renderbuffers[p_texture.__cid];
			if(fb_id != haxor.graphics.GL.INVALID) haxor.graphics.GL.m_gl.DeleteFramebuffer(fb_id);
			if(rb_id != haxor.graphics.GL.INVALID) haxor.graphics.GL.m_gl.DeleteRenderbuffer(rb_id);
		}
		haxor.context.EngineContext.texture.tid.set_id(p_texture.__cid);
	}
	,__class__: haxor.context.TextureContext
};
haxor.context.TransformContext = function() {
	this.tid = new haxor.context.UID();
};
$hxClasses["haxor.context.TransformContext"] = haxor.context.TransformContext;
haxor.context.TransformContext.__name__ = ["haxor","context","TransformContext"];
haxor.context.TransformContext.prototype = {
	Initialize: function() {
	}
	,OnChange: function(t) {
		t.m_uniform_dirty = true;
		var cl = t.m_entity.m_components;
		var _g1 = 0;
		var _g = cl.length;
		while(_g1 < _g) {
			var i = _g1++;
			cl[i].OnTransformUpdate();
		}
	}
	,__class__: haxor.context.TransformContext
};
haxor.context.UID = function() {
	this.m_id = 0;
	this.m_cache = [];
};
$hxClasses["haxor.context.UID"] = haxor.context.UID;
haxor.context.UID.__name__ = ["haxor","context","UID"];
haxor.context.UID.prototype = {
	get_id: function() {
		if(this.m_cache.length <= 0) return this.m_id++; else return this.m_cache.shift();
	}
	,set_id: function(v) {
		this.m_cache.push(v);
		return v;
	}
	,get_next: function() {
		return this.m_id;
	}
	,__class__: haxor.context.UID
};
haxor.core.BaseApplication = function(p_name) {
	haxor.component.Behaviour.call(this,p_name);
};
$hxClasses["haxor.core.BaseApplication"] = haxor.core.BaseApplication;
haxor.core.BaseApplication.__name__ = ["haxor","core","BaseApplication"];
haxor.core.BaseApplication.__super__ = haxor.component.Behaviour;
haxor.core.BaseApplication.prototype = $extend(haxor.component.Behaviour.prototype,{
	get_protocol: function() {
		if(window.location.protocol.toLowerCase() == "file:") return haxor.core.ApplicationProtocol.File;
		if(window.location.protocol.toLowerCase() == "http:") return haxor.core.ApplicationProtocol.HTTP;
		if(window.location.protocol.toLowerCase() == "https:") return haxor.core.ApplicationProtocol.HTTPS;
		return haxor.core.ApplicationProtocol.None;
	}
	,get_vendor: function() {
		if(this.m_vendor != null) return this.m_vendor;
		var vdr = "";
		if(window.msRequestAnimationFrame 		!= null) vdr = "-ms-";
		if(window.oRequestAnimationFrame 		!= null) vdr = "-o-";
		if(window.webkitRequestAnimationFrame 	!= null) vdr = "-webkit-";
		if(window.mozRequestAnimationFrame 		!= null) vdr = "-moz-";
		return this.m_vendor = vdr;
		return this.m_vendor = "";
	}
	,get_fps: function() {
		return this.m_fps;
	}
	,set_fps: function(v) {
		this.m_fps = v;
		var f = v;
		if(f >= 60.0) f = 1000000.0;
		f *= 1.25;
		this.m_mspf = 1.0 / f * 1000.0;
		return v;
	}
	,get_platform: function() {
		return this.m_platform;
	}
	,OnBuild: function() {
		haxor.component.Behaviour.prototype.OnBuild.call(this);
		haxor.core.BaseApplication.m_instance = this;
		this.m_scenes = [];
		this.set_fps(60);
		this.m_frame_ms = 0.0;
		this.m_init_allowed = false;
		this.m_platform = haxor.core.Platform.Unknown;
		haxor.core.Time.Initialize();
		haxor.graphics.Screen.Initialize(this);
		haxor.input.Input.Initialize();
	}
	,LoadScene: function(p_name) {
	}
	,DestroyScene: function(p_name) {
	}
	,Load: function() {
		return true;
	}
	,Initialize: function() {
	}
	,LoadComplete: function() {
		this.m_init_allowed = true;
	}
	,Update: function() {
		haxor.core.Time.Update();
		haxor.input.Input.m_handler.Update();
		this.CheckResize();
		haxor.core.Engine.Update();
		haxor.core.Engine.Collect();
		haxor.input.Input.m_handler.Clear();
	}
	,Render: function() {
		if(this.m_init_allowed) {
			haxor.core.Console.Log("Application> Initialize.",3);
			this.Initialize();
			this.m_init_allowed = false;
		}
		if(haxor.core.Time.m_clock - this.m_frame_ms >= this.m_mspf) {
			this.m_frame_ms += haxor.core.Time.m_clock - this.m_frame_ms;
			haxor.core.Time.Render();
			haxor.graphics.GL.m_gl.Focus();
			haxor.core.Engine.Render();
			null;
		}
	}
	,OnQuit: function() {
	}
	,OnFocus: function() {
	}
	,OnUnfocus: function() {
	}
	,CheckResize: function() {
		var has_resize = false;
		if(Math.abs(haxor.graphics.Screen.m_width - this.GetContainerWidth()) > 0.0) {
			haxor.graphics.Screen.m_width = this.GetContainerWidth();
			has_resize = true;
		}
		if(Math.abs(haxor.graphics.Screen.m_height - this.GetContainerHeight()) > 0.0) {
			haxor.graphics.Screen.m_height = this.GetContainerHeight();
			has_resize = true;
		}
		if(has_resize) this.OnResize();
	}
	,OnResize: function() {
		haxor.core.Console.Log("Application> Resize [" + haxor.graphics.Screen.m_width + "," + haxor.graphics.Screen.m_height + "]",6);
		haxor.graphics.GL.m_gl.Resize();
		haxor.core.Engine.Resize();
	}
	,OnFullscreenEnter: function() {
	}
	,OnFullscreenExit: function() {
	}
	,OnFullscreenRequest: function(v) {
		return false;
	}
	,OnPointerLockRequest: function(v) {
		return false;
	}
	,OnPointerVisibilityRequest: function(v) {
		return false;
	}
	,OnMousePosition: function(p_x,p_y) {
	}
	,GetContainerWidth: function() {
		return 0.0;
	}
	,GetContainerHeight: function() {
		return 0.0;
	}
	,__class__: haxor.core.BaseApplication
});
haxor.platform = {};
haxor.platform.html = {};
haxor.platform.html.HTMLApplication = function() {
	haxor.core.BaseApplication.call(this);
	this.m_platform = haxor.core.Platform.HTML;
};
$hxClasses["haxor.platform.html.HTMLApplication"] = haxor.platform.html.HTMLApplication;
haxor.platform.html.HTMLApplication.__name__ = ["haxor","platform","html","HTMLApplication"];
haxor.platform.html.HTMLApplication.__super__ = haxor.core.BaseApplication;
haxor.platform.html.HTMLApplication.prototype = $extend(haxor.core.BaseApplication.prototype,{
	get_stage: function() {
		return haxor.dom.DOMStage.m_instance;
	}
	,GetContainerWidth: function() {
		return this.m_container.clientWidth;
	}
	,GetContainerHeight: function() {
		return this.m_container.clientHeight;
	}
	,__class__: haxor.platform.html.HTMLApplication
});
haxor.core.Application = function() {
	haxor.platform.html.HTMLApplication.call(this);
};
$hxClasses["haxor.core.Application"] = haxor.core.Application;
haxor.core.Application.__name__ = ["haxor","core","Application"];
haxor.core.Application.__super__ = haxor.platform.html.HTMLApplication;
haxor.core.Application.prototype = $extend(haxor.platform.html.HTMLApplication.prototype,{
	__class__: haxor.core.Application
});
haxor.core.Platform = { __ename__ : true, __constructs__ : ["Unknown","Windows","Linux","Android","MacOS","iOS","HTML","NodeJS"] };
haxor.core.Platform.Unknown = ["Unknown",0];
haxor.core.Platform.Unknown.__enum__ = haxor.core.Platform;
haxor.core.Platform.Windows = ["Windows",1];
haxor.core.Platform.Windows.__enum__ = haxor.core.Platform;
haxor.core.Platform.Linux = ["Linux",2];
haxor.core.Platform.Linux.__enum__ = haxor.core.Platform;
haxor.core.Platform.Android = ["Android",3];
haxor.core.Platform.Android.__enum__ = haxor.core.Platform;
haxor.core.Platform.MacOS = ["MacOS",4];
haxor.core.Platform.MacOS.__enum__ = haxor.core.Platform;
haxor.core.Platform.iOS = ["iOS",5];
haxor.core.Platform.iOS.__enum__ = haxor.core.Platform;
haxor.core.Platform.HTML = ["HTML",6];
haxor.core.Platform.HTML.__enum__ = haxor.core.Platform;
haxor.core.Platform.NodeJS = ["NodeJS",7];
haxor.core.Platform.NodeJS.__enum__ = haxor.core.Platform;
haxor.core.ApplicationProtocol = { __ename__ : true, __constructs__ : ["None","File","HTTP","HTTPS"] };
haxor.core.ApplicationProtocol.None = ["None",0];
haxor.core.ApplicationProtocol.None.__enum__ = haxor.core.ApplicationProtocol;
haxor.core.ApplicationProtocol.File = ["File",1];
haxor.core.ApplicationProtocol.File.__enum__ = haxor.core.ApplicationProtocol;
haxor.core.ApplicationProtocol.HTTP = ["HTTP",2];
haxor.core.ApplicationProtocol.HTTP.__enum__ = haxor.core.ApplicationProtocol;
haxor.core.ApplicationProtocol.HTTPS = ["HTTPS",3];
haxor.core.ApplicationProtocol.HTTPS.__enum__ = haxor.core.ApplicationProtocol;
haxor.core.Console = function() { };
$hxClasses["haxor.core.Console"] = haxor.core.Console;
haxor.core.Console.__name__ = ["haxor","core","Console"];
haxor.core.Console.Initialize = function() {
	var c = { log : function(s) {
	}};
	try {
		haxor.core.Console.m_console = console;
	} catch( err ) {
		haxor.core.Console.m_console = c;
	}
};
haxor.core.Console.Breakpoint = function() {
	debugger;
};
haxor.core.Console.Log = function(p_msg,p_level) {
	if(p_level == null) p_level = 0;
	if(haxor.core.Console.verbose >= p_level) haxor.core.Console.m_console.log(p_msg);
};
haxor.core.Console.LogImage = function(p_url,p_height) {
	var s = "background: transparent url(" + p_url + ") no-repeat; font-size: " + (p_height - 3) + "px;";
	haxor.core.Console.m_console.log("%c                                                                                                                                                            ",s);
};
haxor.core.Console.LogWarning = function(p_msg,p_obj) {
	if(haxor.core.Console.m_console == null) console.log("[W] " + p_msg);
	if(p_obj == null) p_obj = [];
	var _g = p_obj.length;
	switch(_g) {
	case 0:
		haxor.core.Console.m_console.warn(p_msg);
		break;
	case 1:
		haxor.core.Console.m_console.warn(p_msg,p_obj[0]);
		break;
	case 2:
		haxor.core.Console.m_console.warn(p_msg,p_obj[0],p_obj[1]);
		break;
	case 3:
		haxor.core.Console.m_console.warn(p_msg,p_obj[0],p_obj[1],p_obj[2]);
		break;
	case 4:
		haxor.core.Console.m_console.warn(p_msg,p_obj[0],p_obj[1],p_obj[2],p_obj[3]);
		break;
	}
};
haxor.core.Console.LogError = function(p_msg,p_obj) {
	if(haxor.core.Console.m_console == null) {
		console.log("[E] " + p_msg);
		return;
	}
	if(p_obj == null) p_obj = [];
	var _g = p_obj.length;
	switch(_g) {
	case 0:
		haxor.core.Console.m_console.error(p_msg);
		break;
	case 1:
		haxor.core.Console.m_console.error(p_msg,p_obj[0]);
		break;
	case 2:
		haxor.core.Console.m_console.error(p_msg,p_obj[0],p_obj[1]);
		break;
	case 3:
		haxor.core.Console.m_console.error(p_msg,p_obj[0],p_obj[1],p_obj[2]);
		break;
	case 4:
		haxor.core.Console.m_console.error(p_msg,p_obj[0],p_obj[1],p_obj[2],p_obj[3]);
		break;
	}
};
haxor.core.Console.ClearStyle = function() {
	haxor.core.Console.m_style = "";
};
haxor.core.Console.Clear = function() {
	if(haxor.core.Console.m_console != null) haxor.core.Console.m_console.clear();
};
haxor.core.Console.TimeStart = function(p_id) {
	if(haxor.core.Console.m_console != null) haxor.core.Console.m_console.time(p_id);
};
haxor.core.Console.TimeEnd = function(p_id) {
	if(haxor.core.Console.m_console != null) haxor.core.Console.m_console.timeEnd(p_id);
};
haxor.core.Console.StackTrace = function() {
	if(haxor.core.Console.m_console != null) haxor.core.Console.m_console.trace();
};
haxor.core.Console.SetStyle = function(p_size,p_color,p_background,p_font) {
	if(p_font == null) p_font = "'Lucida Console', Monaco, monospace";
	if(p_background == null) p_background = "rgba(255,255,255,0)";
	if(p_color == null) p_color = "rgba(0,0,0,1)";
	if(p_size == null) p_size = "12px";
	haxor.core.Console.m_style = "background-color: " + p_background + "; font-size: " + p_size + "; color: " + p_color + "; font-family: " + p_font + ";";
};
haxor.core.EngineState = { __ename__ : true, __constructs__ : ["Play","Editor"] };
haxor.core.EngineState.Play = ["Play",0];
haxor.core.EngineState.Play.__enum__ = haxor.core.EngineState;
haxor.core.EngineState.Editor = ["Editor",1];
haxor.core.EngineState.Editor.__enum__ = haxor.core.EngineState;
haxor.core.Engine = function() { };
$hxClasses["haxor.core.Engine"] = haxor.core.Engine;
haxor.core.Engine.__name__ = ["haxor","core","Engine"];
haxor.core.Engine.Initialize = function() {
	haxor.core.Console.Log("Haxor> Engine Initialize.",3);
	haxor.context.EngineContext.Initialize();
	haxor.core.Engine.state = haxor.core.EngineState.Play;
};
haxor.core.Engine.Collect = function() {
	var dp = haxor.context.EngineContext.disposables;
	var _g1 = 0;
	var _g = haxor.context.EngineContext.collectRate;
	while(_g1 < _g) {
		var i = _g1++;
		if(dp.m_length <= 0) break;
		var o = dp.list[0];
		o.OnDestroy();
		dp.Remove(o);
	}
};
haxor.core.Engine.Update = function() {
	if(haxor.core.Engine.state == haxor.core.EngineState.Editor) return;
	var up = haxor.context.EngineContext.update;
	var _g1 = 0;
	var _g = up.m_length;
	while(_g1 < _g) {
		var i = _g1++;
		var r = up.list[i];
		if(r.m_destroyed) continue;
		if(r.m_is_behaviour) {
			var b = r;
			if(!b.m_is_awake) {
				b.OnAwake();
				b.m_is_awake = true;
			}
			if(!b.m_is_start) {
				b.OnStart();
				b.m_is_start = true;
			}
		}
		up.list[i].OnUpdate();
	}
};
haxor.core.Engine.Render = function() {
	haxor.core.RenderEngine.Render();
	haxor.core.Engine.RenderIRenderers();
};
haxor.core.Engine.RenderIRenderers = function() {
	var rp = haxor.context.EngineContext.render;
	var _g1 = 0;
	var _g = rp.m_length;
	while(_g1 < _g) {
		var i = _g1++;
		var r = rp.list[i];
		if(r.m_destroyed) continue;
		rp.list[i].OnRender();
	}
};
haxor.core.Engine.Resize = function() {
	haxor.core.RenderEngine.Resize();
	if(haxor.core.Engine.state == haxor.core.EngineState.Editor) return;
	var rp = haxor.context.EngineContext.resize;
	var _g1 = 0;
	var _g = rp.m_length;
	while(_g1 < _g) {
		var i = _g1++;
		var r = rp.list[i];
		if(r.m_destroyed) continue;
		rp.list[i].OnResize(haxor.graphics.Screen.m_width,haxor.graphics.Screen.m_height);
	}
};
haxor.core.Entity = function(p_name) {
	if(p_name == null) p_name = "";
	haxor.core.Resource.call(this,p_name);
	this.m_enabled = true;
	this.m_components = [];
	this.m_layer = 1;
	this.m_transform = this.AddComponent(haxor.component.Transform);
};
$hxClasses["haxor.core.Entity"] = haxor.core.Entity;
haxor.core.Entity.__name__ = ["haxor","core","Entity"];
haxor.core.Entity.__super__ = haxor.core.Resource;
haxor.core.Entity.prototype = $extend(haxor.core.Resource.prototype,{
	get_enabled: function() {
		return this.m_enabled && !this.m_destroyed;
	}
	,set_enabled: function(v) {
		if(this.m_destroyed) return false;
		if(this.m_enabled == v) return v;
		this.m_enabled = v;
		var _g1 = 0;
		var _g = this.m_components.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_components[i];
			if(c.m_is_behaviour) {
				var b = c;
				b.set_enabled(v);
			}
		}
		return v;
	}
	,get_transform: function() {
		return this.m_transform;
	}
	,get_layer: function() {
		return this.m_layer;
	}
	,set_layer: function(v) {
		if(v <= 0) v = 1;
		if(this.m_layer == v) return v;
		var ll = this.m_layer;
		this.m_layer = v;
		haxor.context.EngineContext.OnEntiyLayerChange(this,ll,this.m_layer);
		return this.m_layer;
	}
	,AddComponent: function(p_type) {
		if(this.m_destroyed) return null;
		if(this.m_transform != null) {
			if(p_type == haxor.component.Transform) return this.m_transform;
		}
		var c = null;
		c = Type.createInstance(p_type,[""]);
		if(c == null) return null;
		c.m_entity = this;
		if(c.m_is_behaviour) {
			var b = c;
			b.set_enabled(this.m_enabled && !this.m_destroyed);
		}
		c.OnBuild();
		this.m_components.push(c);
		return c;
	}
	,GetComponent: function(p_type) {
		var _g1 = 0;
		var _g = this.m_components.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(js.Boot.__instanceof(this.m_components[i],p_type)) return this.m_components[i];
		}
		return null;
	}
	,GetComponents: function(p_type) {
		var res = [];
		var _g1 = 0;
		var _g = this.m_components.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(js.Boot.__instanceof(this.m_components[i],p_type)) res.push(this.m_components[i]);
		}
		return res;
	}
	,GetComponentInChildren: function(p_type) {
		var res = [];
		var res1 = null;
		this.m_transform.Traverse(function(t,d) {
			if(res1 != null) return true;
			var l = t.m_entity.GetComponents(p_type);
			if(l.length > 0) {
				res1 = l[0];
				return true;
			}
			return true;
		});
		return res1;
	}
	,GetComponentsInChildren: function(p_type) {
		var res = [];
		this.m_transform.Traverse(function(t,d) {
			var l = t.m_entity.GetComponents(p_type);
			var _g1 = 0;
			var _g = l.length;
			while(_g1 < _g) {
				var i = _g1++;
				res.push(l[i]);
			}
			return true;
		});
		return res;
	}
	,OnDestroy: function() {
		var _g1 = 0;
		var _g = this.m_components.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_components[i].OnDestroy();
		}
		this.m_components = null;
	}
	,__class__: haxor.core.Entity
});
haxor.core.RenderQueue = function() { };
$hxClasses["haxor.core.RenderQueue"] = haxor.core.RenderQueue;
haxor.core.RenderQueue.__name__ = ["haxor","core","RenderQueue"];
haxor.core.BlendMode = function() { };
$hxClasses["haxor.core.BlendMode"] = haxor.core.BlendMode;
haxor.core.BlendMode.__name__ = ["haxor","core","BlendMode"];
haxor.core.MeshMode = function() { };
$hxClasses["haxor.core.MeshMode"] = haxor.core.MeshMode;
haxor.core.MeshMode.__name__ = ["haxor","core","MeshMode"];
haxor.core.MeshPrimitive = function() { };
$hxClasses["haxor.core.MeshPrimitive"] = haxor.core.MeshPrimitive;
haxor.core.MeshPrimitive.__name__ = ["haxor","core","MeshPrimitive"];
haxor.core.CullMode = function() { };
$hxClasses["haxor.core.CullMode"] = haxor.core.CullMode;
haxor.core.CullMode.__name__ = ["haxor","core","CullMode"];
haxor.core.DepthTest = function() { };
$hxClasses["haxor.core.DepthTest"] = haxor.core.DepthTest;
haxor.core.DepthTest.__name__ = ["haxor","core","DepthTest"];
haxor.core.PixelFormat = { __ename__ : true, __constructs__ : ["Alpha8","Luminance","RGB8","RGBA8","Half","Half3","Half4","Float","Float3","Float4","Depth"] };
haxor.core.PixelFormat.Alpha8 = ["Alpha8",0];
haxor.core.PixelFormat.Alpha8.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.Luminance = ["Luminance",1];
haxor.core.PixelFormat.Luminance.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.RGB8 = ["RGB8",2];
haxor.core.PixelFormat.RGB8.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.RGBA8 = ["RGBA8",3];
haxor.core.PixelFormat.RGBA8.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.Half = ["Half",4];
haxor.core.PixelFormat.Half.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.Half3 = ["Half3",5];
haxor.core.PixelFormat.Half3.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.Half4 = ["Half4",6];
haxor.core.PixelFormat.Half4.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.Float = ["Float",7];
haxor.core.PixelFormat.Float.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.Float3 = ["Float3",8];
haxor.core.PixelFormat.Float3.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.Float4 = ["Float4",9];
haxor.core.PixelFormat.Float4.__enum__ = haxor.core.PixelFormat;
haxor.core.PixelFormat.Depth = ["Depth",10];
haxor.core.PixelFormat.Depth.__enum__ = haxor.core.PixelFormat;
haxor.core.TextureFilter = { __ename__ : true, __constructs__ : ["Nearest","Linear","NearestMipmapNearest","NearestMipmapLinear","LinearMipmapNearest","LinearMipmapLinear","Trilinear"] };
haxor.core.TextureFilter.Nearest = ["Nearest",0];
haxor.core.TextureFilter.Nearest.__enum__ = haxor.core.TextureFilter;
haxor.core.TextureFilter.Linear = ["Linear",1];
haxor.core.TextureFilter.Linear.__enum__ = haxor.core.TextureFilter;
haxor.core.TextureFilter.NearestMipmapNearest = ["NearestMipmapNearest",2];
haxor.core.TextureFilter.NearestMipmapNearest.__enum__ = haxor.core.TextureFilter;
haxor.core.TextureFilter.NearestMipmapLinear = ["NearestMipmapLinear",3];
haxor.core.TextureFilter.NearestMipmapLinear.__enum__ = haxor.core.TextureFilter;
haxor.core.TextureFilter.LinearMipmapNearest = ["LinearMipmapNearest",4];
haxor.core.TextureFilter.LinearMipmapNearest.__enum__ = haxor.core.TextureFilter;
haxor.core.TextureFilter.LinearMipmapLinear = ["LinearMipmapLinear",5];
haxor.core.TextureFilter.LinearMipmapLinear.__enum__ = haxor.core.TextureFilter;
haxor.core.TextureFilter.Trilinear = ["Trilinear",6];
haxor.core.TextureFilter.Trilinear.__enum__ = haxor.core.TextureFilter;
haxor.core.TextureWrap = function() { };
$hxClasses["haxor.core.TextureWrap"] = haxor.core.TextureWrap;
haxor.core.TextureWrap.__name__ = ["haxor","core","TextureWrap"];
haxor.core.TextureType = { __ename__ : true, __constructs__ : ["None","Texture2D","TextureCube","RenderTexture","Compute"] };
haxor.core.TextureType.None = ["None",0];
haxor.core.TextureType.None.__enum__ = haxor.core.TextureType;
haxor.core.TextureType.Texture2D = ["Texture2D",1];
haxor.core.TextureType.Texture2D.__enum__ = haxor.core.TextureType;
haxor.core.TextureType.TextureCube = ["TextureCube",2];
haxor.core.TextureType.TextureCube.__enum__ = haxor.core.TextureType;
haxor.core.TextureType.RenderTexture = ["RenderTexture",3];
haxor.core.TextureType.RenderTexture.__enum__ = haxor.core.TextureType;
haxor.core.TextureType.Compute = ["Compute",4];
haxor.core.TextureType.Compute.__enum__ = haxor.core.TextureType;
haxor.core.ClearFlag = function() { };
$hxClasses["haxor.core.ClearFlag"] = haxor.core.ClearFlag;
haxor.core.ClearFlag.__name__ = ["haxor","core","ClearFlag"];
haxor.core.InputState = { __ename__ : true, __constructs__ : ["None","Down","Up","Hold"] };
haxor.core.InputState.None = ["None",0];
haxor.core.InputState.None.__enum__ = haxor.core.InputState;
haxor.core.InputState.Down = ["Down",1];
haxor.core.InputState.Down.__enum__ = haxor.core.InputState;
haxor.core.InputState.Up = ["Up",2];
haxor.core.InputState.Up.__enum__ = haxor.core.InputState;
haxor.core.InputState.Hold = ["Hold",3];
haxor.core.InputState.Hold.__enum__ = haxor.core.InputState;
haxor.core.IRenderable = function() { };
$hxClasses["haxor.core.IRenderable"] = haxor.core.IRenderable;
haxor.core.IRenderable.__name__ = ["haxor","core","IRenderable"];
haxor.core.IRenderable.prototype = {
	__class__: haxor.core.IRenderable
};
haxor.core.IResizeable = function() { };
$hxClasses["haxor.core.IResizeable"] = haxor.core.IResizeable;
haxor.core.IResizeable.__name__ = ["haxor","core","IResizeable"];
haxor.core.IResizeable.prototype = {
	__class__: haxor.core.IResizeable
};
haxor.core.IUpdateable = function() { };
$hxClasses["haxor.core.IUpdateable"] = haxor.core.IUpdateable;
haxor.core.IUpdateable.__name__ = ["haxor","core","IUpdateable"];
haxor.core.IUpdateable.prototype = {
	__class__: haxor.core.IUpdateable
};
haxor.core.RenderEngine = function() { };
$hxClasses["haxor.core.RenderEngine"] = haxor.core.RenderEngine;
haxor.core.RenderEngine.__name__ = ["haxor","core","RenderEngine"];
haxor.core.RenderEngine.Render = function() {
	haxor.core.RenderEngine.RenderCameras();
	haxor.core.RenderEngine.RenderFinish();
};
haxor.core.RenderEngine.RenderCameras = function() {
	var cl = haxor.context.EngineContext.camera.list;
	var _g1 = 0;
	var _g = cl.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = haxor.component.Camera.m_current = cl[i];
		haxor.core.RenderEngine.RenderCamera(c);
	}
};
haxor.core.RenderEngine.RenderCamera = function(c) {
	if(!c.get_enabled()) return;
	haxor.context.EngineContext.camera.Bind(c);
	var layers = c.m_layers;
	var _g1 = 0;
	var _g = layers.length;
	while(_g1 < _g) {
		var i = _g1++;
		var l = layers[i];
		haxor.core.RenderEngine.RenderCameraLayer(l,c);
	}
	haxor.context.EngineContext.camera.Unbind(c);
};
haxor.core.RenderEngine.RenderCameraLayer = function(l,c) {
	var lt = null;
	var renderers = haxor.context.EngineContext.renderer.display[l];
	var _g1 = 0;
	var _g = renderers.m_length;
	while(_g1 < _g) {
		var j = _g1++;
		var r = renderers.list[j];
		if(haxor.context.EngineContext.renderer.IsSAPCulled(r,c)) continue;
		haxor.core.RenderEngine.RenderRenderer(r);
	}
};
haxor.core.RenderEngine.RenderRenderer = function(r) {
	r.UpdateCulling();
	if(!(r.m_visible && !r.m_culled)) return;
	r.OnRender();
};
haxor.core.RenderEngine.RenderFinish = function() {
	var cl = haxor.context.EngineContext.camera.list;
	var _g1 = 0;
	var _g = cl.length;
	while(_g1 < _g) {
		var i = _g1++;
		cl[i].m_view_uniform_dirty = false;
		cl[i].m_proj_uniform_dirty = false;
	}
	haxor.context.EngineContext.renderer.sap_dirty = false;
};
haxor.core.RenderEngine.Resize = function() {
	haxor.context.EngineContext.camera.Resize();
};
haxor.core.Scene = function(p_name) {
	haxor.core.Resource.call(this,p_name);
};
$hxClasses["haxor.core.Scene"] = haxor.core.Scene;
haxor.core.Scene.__name__ = ["haxor","core","Scene"];
haxor.core.Scene.__super__ = haxor.core.Resource;
haxor.core.Scene.prototype = $extend(haxor.core.Resource.prototype,{
	__class__: haxor.core.Scene
});
haxor.core.Stats = function() { };
$hxClasses["haxor.core.Stats"] = haxor.core.Stats;
haxor.core.Stats.__name__ = ["haxor","core","Stats"];
haxor.core.Stats.get_total = function() {
	return haxor.core.Stats.visible + haxor.core.Stats.culled;
};
haxor.core.Stats.Initialize = function() {
	haxor.core.Stats.visible = 0;
	haxor.core.Stats.culled = 0;
	haxor.core.Stats.triangles = 0;
	haxor.core.Stats.renderers = 0;
};
haxor.core.Stats.BeginRender = function() {
	haxor.core.Stats.visible = 0;
	haxor.core.Stats.culled = 0;
	haxor.core.Stats.triangles = 0;
	haxor.core.Stats.renderers = haxor.context.EngineContext.renderer.rid.get_next();
};
haxor.core.Time = function() { };
$hxClasses["haxor.core.Time"] = haxor.core.Time;
haxor.core.Time.__name__ = ["haxor","core","Time"];
haxor.core.Time.get_system = function() {
	return haxor.core.Time.m_system;
};
haxor.core.Time.get_clock = function() {
	return haxor.core.Time.m_clock;
};
haxor.core.Time.get_delta = function() {
	return haxor.core.Time.m_delta;
};
haxor.core.Time.get_framedelta = function() {
	return haxor.core.Time.m_frame_delta;
};
haxor.core.Time.get_elapsed = function() {
	return haxor.core.Time.m_elapsed;
};
haxor.core.Time.get_fps = function() {
	return haxor.core.Time.m_fps;
};
haxor.core.Time.get_ups = function() {
	return haxor.core.Time.m_ups;
};
haxor.core.Time.get_frame = function() {
	return haxor.core.Time.m_frame;
};
haxor.core.Time.Initialize = function() {
	haxor.core.Time.m_system = 0.0;
	haxor.core.Time.m_clock_0 = 0.0;
	haxor.core.Time.m_clock_0 = haxor.core.Time.m_system;
	haxor.core.Time.m_clock = haxor.core.Time.m_system;
	haxor.core.Time.m_clock_dt = 0.0;
	haxor.core.Time.m_start_clock = haxor.core.Time.m_clock;
	haxor.core.Time.m_last_clock = haxor.core.Time.m_clock;
	haxor.core.Time.m_last_frame_clock = haxor.core.Time.m_clock;
	haxor.core.Time.m_stats_clock = haxor.core.Time.m_clock;
	haxor.core.Time.m_elapsed = 0.0;
	haxor.core.Time.m_delta = 0.0;
	haxor.core.Time.m_frame_delta = 0.0;
	haxor.core.Time.m_ups = 0;
	haxor.core.Time.m_fps = 0;
	haxor.core.Time.m_updates = 0.0;
	haxor.core.Time.m_frame_count = 0.0;
	haxor.core.Time.m_frame = 0;
};
haxor.core.Time.Update = function() {
	haxor.core.Time.m_clock = haxor.core.Time.m_system;
	haxor.core.Time.m_clock_dt = haxor.core.Time.m_clock - haxor.core.Time.m_last_clock;
	if(haxor.core.Time.m_clock_dt <= 0) haxor.core.Time.m_clock_dt = 1.0;
	haxor.core.Time.m_last_clock = haxor.core.Time.m_clock;
	haxor.core.Time.m_delta = haxor.core.Time.m_clock_dt * 0.001;
	haxor.core.Time.m_elapsed = haxor.core.Time.m_clock * 0.001;
	haxor.core.Time.m_updates += 1.0;
	if(haxor.core.Time.m_clock - haxor.core.Time.m_stats_clock >= 1000.0) {
		haxor.core.Time.m_stats_clock += haxor.core.Time.m_clock - haxor.core.Time.m_stats_clock;
		haxor.core.Time.m_ups = haxor.core.Time.m_updates;
		haxor.core.Time.m_fps = haxor.core.Time.m_frame_count;
		haxor.core.Time.m_updates = 0.0;
		haxor.core.Time.m_frame_count = 0.0;
		haxor.core.Console.Log("FPS: " + haxor.core.Time.m_fps,7);
	}
};
haxor.core.Time.Render = function() {
	haxor.core.Time.m_frame_count += 1.0;
	haxor.core.Time.m_frame++;
	haxor.core.Time.m_frame_delta = (haxor.core.Time.m_clock - haxor.core.Time.m_last_frame_clock) * 0.001;
	haxor.core.Time.m_last_frame_clock = haxor.core.Time.m_clock;
};
haxor.dom = {};
haxor.dom.DOMEntity = function(p_element,p_name) {
	if(p_name == null) p_name = "";
	haxor.core.Resource.call(this,p_name);
	this.m_layout = new haxor.dom.DOMLayout(this);
	this.m_x = 0;
	this.m_y = 0;
	this.m_px = 0;
	this.m_py = 0;
	this.m_width = 0;
	this.m_height = 0;
	this.m_rotation = 0;
	this.m_sx = 1.0;
	this.m_sy = 1.0;
	this.m_mouseEnabled = true;
	this.m_alpha = 1;
	this.m_globalAlpha = 1;
	this.m_globalVisible = true;
	this.m_visible = true;
	this.m_parent = null;
	this.set_element(p_element);
	if(p_name == "") this.set_name(this.m_type_name + this.get_uid()); else this.set_name(p_name);
};
$hxClasses["haxor.dom.DOMEntity"] = haxor.dom.DOMEntity;
haxor.dom.DOMEntity.__name__ = ["haxor","dom","DOMEntity"];
haxor.dom.DOMEntity.__super__ = haxor.core.Resource;
haxor.dom.DOMEntity.prototype = $extend(haxor.core.Resource.prototype,{
	get_x: function() {
		return this.m_x;
	}
	,set_x: function(v) {
		this.m_x = v;
		this.UpdateTransform();
		return v;
	}
	,get_y: function() {
		return this.m_y;
	}
	,set_y: function(v) {
		this.m_y = v;
		this.UpdateTransform();
		return v;
	}
	,get_px: function() {
		return this.m_px;
	}
	,set_px: function(v) {
		this.m_px = v;
		this.UpdateTransform();
		return v;
	}
	,get_py: function() {
		return this.m_py;
	}
	,set_py: function(v) {
		this.m_py = v;
		this.UpdateTransform();
		return v;
	}
	,get_width: function() {
		return this.m_width;
	}
	,set_width: function(v) {
		this.m_width = Math.max(0,v);
		this.UpdateRect();
		return this.m_width;
	}
	,get_height: function() {
		return this.m_height;
	}
	,set_height: function(v) {
		this.m_height = Math.max(0,v);
		this.UpdateRect();
		return this.m_height;
	}
	,get_sx: function() {
		return this.m_sx;
	}
	,set_sx: function(v) {
		this.m_sx = v;
		this.UpdateTransform();
		return v;
	}
	,get_sy: function() {
		return this.m_sy;
	}
	,set_sy: function(v) {
		this.m_sy = v;
		this.UpdateTransform();
		return v;
	}
	,get_rotation: function() {
		return this.m_rotation;
	}
	,set_rotation: function(v) {
		this.m_rotation = v;
		this.UpdateTransform();
		return v;
	}
	,get_mouseX: function() {
		if(this.get_parent() == null) return haxor.input.Input.mouse.x; else return this.get_parent().get_mouseX() - this.m_x;
	}
	,get_mouseY: function() {
		if(this.get_parent() == null) return haxor.input.Input.mouse.y; else return this.get_parent().get_mouseY() - this.get_y();
	}
	,get_rect: function() {
		var m = this.get_layout().get_margin();
		return new haxor.math.AABB2(Std["int"](this.m_x - this.m_px + m.get_xMin()),Std["int"](this.m_y - this.m_py + m.get_yMin()),Std["int"](this.m_width - (m.get_xMin() + m.get_xMax())),Std["int"](this.m_height - (m.get_yMin() + m.get_yMax())));
	}
	,get_alpha: function() {
		return this.m_alpha;
	}
	,set_alpha: function(v) {
		this.m_alpha = v;
		this.UpdateMaterial();
		return v;
	}
	,get_visible: function() {
		return this.m_visible;
	}
	,set_visible: function(v) {
		this.m_visible = v;
		this.UpdateMaterial();
		return v;
	}
	,get_mouseEnabled: function() {
		return this.m_mouseEnabled;
	}
	,set_mouseEnabled: function(v) {
		this.m_mouseEnabled = v;
		if(this.m_element != null) this.m_element.style.setProperty("pointer-events",v?"auto":"none","");
		return v;
	}
	,get_layout: function() {
		return this.m_layout;
	}
	,get_parent: function() {
		return this.m_parent;
	}
	,get_stage: function() {
		return haxor.dom.DOMStage.m_instance;
	}
	,set_name: function(v) {
		haxor.core.Resource.prototype.set_name.call(this,v);
		if(this.m_element != null) this.m_element.setAttribute("name",v);
		return v;
	}
	,get_element: function() {
		return this.m_element;
	}
	,set_element: function(v) {
		if(this.m_element == v) return v;
		var e = this.m_element;
		if(this.get_stage() != this) {
			if(e != null) {
				var pe = e.parentElement;
				pe.replaceChild(v,e);
				e.remove();
			}
		}
		this.m_element = e = v;
		if(this.get_stage() != this) {
			if(e != null) {
				e.style.position = "absolute";
				e.style.left = e.style.top = "0px";
				e.setAttribute("script",this.m_type_name);
				e.setAttribute("name",this.get_name());
			}
		}
		return e;
	}
	,UpdateMaterial: function() {
		if(this.get_stage() == this) return;
		var pa;
		if(this.get_parent() == null) pa = 1.0; else pa = this.get_parent().m_globalAlpha;
		var pv;
		if(this.get_parent() == null) pv = true; else pv = this.get_parent().m_globalVisible;
		var e = this.m_element;
		var is_negative = pa < 0 || this.m_alpha < 0;
		this.m_globalAlpha = haxor.math.Mathf.Clamp01(this.m_alpha) * haxor.math.Mathf.Clamp01(this.m_alpha);
		if(is_negative) this.m_globalAlpha = -this.m_globalAlpha;
		this.m_globalVisible = this.m_visible && pv && !is_negative;
		e.style.opacity = this.m_globalAlpha + "";
		if(this.m_globalVisible) e.style.display = "block"; else e.style.display = "none";
	}
	,UpdateRect: function() {
		if(this.get_stage() == this) return;
		var e = this.m_element;
		var m = this.get_layout().m_margin;
		this.get_layout().Update();
		e.style.width = Std["int"](this.m_width - (m.get_xMin() + m.get_xMax())) + "px";
		e.style.height = Std["int"](this.m_height - (m.get_yMin() + m.get_yMax())) + "px";
		this.OnRepaint();
	}
	,UpdateTransform: function() {
		if(this.get_stage() == this) return;
		var e = this.m_element;
		var m = this.get_layout().m_margin;
		this.get_layout().Update();
		var px = haxor.math.Mathf.Floor(this.m_x - this.m_px + m.get_xMin());
		var py = haxor.math.Mathf.Floor(this.m_y - this.m_py + m.get_yMin());
		var ox = px + this.m_px;
		var oy = py + this.m_py;
		var vdn = this.get_application().get_vendor();
		var tov = e.style.getPropertyValue(vdn + "transform-origin");
		if(tov != "" && tov != null) e.style.removeProperty(vdn + "transform-origin");
		e.style.cssText = e.style.cssText + " " + vdn + "transform-origin: " + ox + "px " + oy + "px;";
		var tp = vdn + "transform(" + "rotate3d(0,0,1," + this.m_rotation + "deg) scale3d(" + this.m_sx + "," + this.m_sy + ",1.0) translate3d(" + px + "px," + py + "px,0px)" + ")";
		e.style.setProperty(vdn + "transform","rotate3d(0,0,1," + this.m_rotation + "deg) scale3d(" + this.m_sx + "," + this.m_sy + ",1.0) translate3d(" + px + "px," + py + "px,0px)","");
	}
	,OnRepaint: function() {
	}
	,OnAdded: function() {
	}
	,OnAddedToStage: function() {
	}
	,OnRemoved: function() {
	}
	,AddedToStage: function() {
		if(!this.m_added_stage) {
			this.m_added_stage = true;
			this.OnAddedToStage();
		}
	}
	,__class__: haxor.dom.DOMEntity
});
haxor.dom.Container = function(p_element,p_name) {
	if(p_name == null) p_name = "";
	this.m_children = [];
	var e;
	if(p_element == null) {
		var _this = window.document;
		e = _this.createElement("div");
	} else e = p_element;
	haxor.dom.DOMEntity.call(this,e,p_name);
};
$hxClasses["haxor.dom.Container"] = haxor.dom.Container;
haxor.dom.Container.__name__ = ["haxor","dom","Container"];
haxor.dom.Container.DOMPath = function(p_element) {
	var p = [];
	var it = p_element;
	while(it != null) {
		if(it.hasAttribute("script")) {
			if(it.getAttribute("script").toLowerCase().indexOf("stage") >= 0) break;
			p.push(it.getAttribute("name"));
		}
		it = it.parentElement;
	}
	p.reverse();
	return p.join(".");
};
haxor.dom.Container.__super__ = haxor.dom.DOMEntity;
haxor.dom.Container.prototype = $extend(haxor.dom.DOMEntity.prototype,{
	get_childCount: function() {
		if(this.m_children == null) return 0; else return this.m_children.length;
	}
	,IsChild: function(p_child) {
		if(this.m_children == null) return false;
		var _g = 0;
		var _g1 = this.m_children;
		while(_g < _g1.length) {
			var it = _g1[_g];
			++_g;
			if(it == p_child) return true;
		}
		return false;
	}
	,Parse: function(p_target) {
		var l = p_target.children;
		var _g1 = 1;
		var _g = l.length;
		while(_g1 < _g) {
			var i = _g1++;
			var it = l.item(i);
			haxor.dom.DOMStage.BuildStep(it,this);
		}
		var _g11 = 0;
		var _g2 = l.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var it1 = l.item(i1);
			if(it1 == null) continue;
			var _g21 = it1.nodeName.toLowerCase();
			switch(_g21) {
			case "container":
				it1.remove();
				break;
			case "sprite":
				it1.remove();
				break;
			}
		}
	}
	,AddChild: function(p_child) {
		this.AddChildAt(p_child);
	}
	,AddChildAt: function(p_child,p_index) {
		if(p_index == null) p_index = -1;
		if(p_child == this) return;
		if(this.IsChild(p_child)) return;
		if(p_child.get_parent() != null) p_child.get_parent().RemoveChild(p_child);
		var pos;
		if(p_index < 0) pos = this.m_children.length; else pos = p_index;
		this.m_children.push(p_child);
		this.m_element.appendChild(p_child.m_element);
		p_child.m_parent = this;
		this.SetChildIndex(p_child,pos);
		this.UpdateTransform();
		this.UpdateRect();
		this.UpdateMaterial();
		if(this.get_stage() != null || haxor.dom.DOMStage.m_instance == this) this.AddedToStage();
	}
	,RemoveChild: function(p_child) {
		if(!this.IsChild(p_child)) return;
		HxOverrides.remove(this.m_children,p_child);
		this.m_element.removeChild(p_child.m_element);
		p_child.m_parent = null;
	}
	,GetChildByName: function(p_name) {
		var _g1 = 0;
		var _g = this.m_children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.m_children[i].get_name() == p_name) return this.m_children[i];
		}
		return null;
	}
	,GetChildAt: function(p_index) {
		return this.m_children[p_index];
	}
	,GetChildIndex: function(p_child) {
		var _g1 = 0;
		var _g = this.m_children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.m_children[i] == p_child) return i;
		}
		return -1;
	}
	,SetChildIndex: function(p_child,p_index) {
		if(!this.IsChild(p_child)) return;
		var p = haxor.math.Mathf.ClampInt(p_index,0,this.m_children.length - 1);
		if(p_child == this.m_children[p]) return;
		var e1 = this.m_children[p].m_element;
		this.m_element.removeChild(p_child.m_element);
		this.m_element.insertBefore(p_child.m_element,e1);
		HxOverrides.remove(this.m_children,p_child);
		this.m_children.splice(p,0,p_child);
	}
	,Find: function(p_path) {
		var pth = p_path.split(".");
		if(pth.length <= 0) return null;
		var it = this;
		var _g1 = 0;
		var _g = pth.length;
		while(_g1 < _g) {
			var i = _g1++;
			var p = pth[i];
			it = it.GetChildByName(p);
			if(!js.Boot.__instanceof(it,haxor.dom.Container)) {
				if(i >= pth.length - 1) return it;
			}
		}
		return it;
	}
	,Traverse: function(p_callback) {
		this.TraverseStep(0,this,p_callback);
	}
	,TraverseStep: function(d,it,p_c) {
		if(p_c != null) {
			if(!p_c(d,it)) return;
		}
		if(js.Boot.__instanceof(it,haxor.dom.Container)) {
			var c = it;
			var _g1 = 0;
			var _g = c.m_children.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.TraverseStep(d + 1,c.m_children[i],p_c);
			}
		}
	}
	,UpdateMaterial: function() {
		haxor.dom.DOMEntity.prototype.UpdateMaterial.call(this);
		var _g1 = 0;
		var _g = this.m_children.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_children[i].UpdateMaterial();
		}
	}
	,UpdateTransform: function() {
		haxor.dom.DOMEntity.prototype.UpdateTransform.call(this);
		var _g1 = 0;
		var _g = this.m_children.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_children[i].UpdateTransform();
		}
	}
	,UpdateRect: function() {
		haxor.dom.DOMEntity.prototype.UpdateRect.call(this);
		var _g1 = 0;
		var _g = this.m_children.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_children[i].UpdateRect();
		}
	}
	,AddedToStage: function() {
		haxor.dom.DOMEntity.prototype.AddedToStage.call(this);
		var _g1 = 0;
		var _g = this.m_children.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_children[i].AddedToStage();
		}
	}
	,__class__: haxor.dom.Container
});
haxor.dom.DOMLayout = function(p_element) {
	this.m_element = p_element;
	this.m_lock = false;
	this.m_margin = haxor.math.AABB2.get_empty();
	this.m_x = this.m_y = 0;
	this.m_width = 1;
	this.m_height = 1;
	this.m_px = 0;
	this.m_py = 0;
};
$hxClasses["haxor.dom.DOMLayout"] = haxor.dom.DOMLayout;
haxor.dom.DOMLayout.__name__ = ["haxor","dom","DOMLayout"];
haxor.dom.DOMLayout.prototype = {
	get_px: function() {
		return this.m_px;
	}
	,set_px: function(v) {
		this.m_px = v;
		if((this.m_flag & haxor.dom.LayoutFlag.PivotX) != 0) this.Update();
		return v;
	}
	,get_py: function() {
		return this.m_py;
	}
	,set_py: function(v) {
		this.m_py = v;
		if((this.m_flag & haxor.dom.LayoutFlag.PivotY) != 0) this.Update();
		return v;
	}
	,get_x: function() {
		return this.m_x;
	}
	,set_x: function(v) {
		this.m_x = v;
		if((this.m_flag & haxor.dom.LayoutFlag.PositionX) != 0) this.Update();
		return v;
	}
	,get_y: function() {
		return this.m_y;
	}
	,set_y: function(v) {
		this.m_y = v;
		if((this.m_flag & haxor.dom.LayoutFlag.PositionY) != 0) this.Update();
		return v;
	}
	,get_width: function() {
		return this.m_width;
	}
	,set_width: function(v) {
		this.m_width = v;
		if((this.m_flag & haxor.dom.LayoutFlag.SizeX) != 0) this.Update();
		return v;
	}
	,get_height: function() {
		return this.m_height;
	}
	,set_height: function(v) {
		this.m_height = v;
		if((this.m_flag & haxor.dom.LayoutFlag.SizeY) != 0) this.Update();
		return v;
	}
	,get_flag: function() {
		return this.m_flag;
	}
	,set_flag: function(v) {
		this.m_flag = v;
		this.Update();
		return v;
	}
	,get_margin: function() {
		return this.m_margin.get_clone();
	}
	,set_margin: function(v) {
		this.m_margin.SetAABB2(v);
		this.m_element.UpdateTransform();
		return v;
	}
	,Set: function(p_flag,p_px,p_py,p_x,p_y) {
		this.m_flag = p_flag;
		this.m_px = p_px;
		this.m_py = p_py;
		this.m_x = p_x;
		this.m_y = p_y;
		this.Update();
	}
	,FitSize: function() {
		this.m_width = 1;
		this.m_height = 1;
		this.set_flag(haxor.dom.LayoutFlag.SizeXY);
	}
	,FitWidth: function() {
		this.set_width(1);
		this.set_flag(this.m_flag | haxor.dom.LayoutFlag.SizeX);
	}
	,FitHeight: function() {
		this.set_height(1);
		this.set_flag(this.m_flag | haxor.dom.LayoutFlag.SizeY);
	}
	,Update: function() {
		if(this.m_lock) return;
		this.m_lock = true;
		var p = this.m_element.get_parent();
		var pw;
		if(p == null) pw = 0; else pw = p.get_width() - p.get_layout().get_margin().get_xMin() - p.get_layout().get_margin().get_xMax();
		var ph;
		if(p == null) ph = 0; else ph = p.get_height() - p.get_layout().get_margin().get_yMin() - p.get_layout().get_margin().get_yMax();
		if((this.m_flag & haxor.dom.LayoutFlag.PositionX) != 0) this.m_element.set_x(pw * this.m_x);
		if((this.m_flag & haxor.dom.LayoutFlag.PositionY) != 0) this.m_element.set_y(ph * this.m_y);
		if((this.m_flag & haxor.dom.LayoutFlag.PivotX) != 0) this.m_element.set_px(this.m_element.get_width() * this.m_px);
		if((this.m_flag & haxor.dom.LayoutFlag.PivotY) != 0) this.m_element.set_py(this.m_element.get_height() * this.m_py);
		if((this.m_flag & haxor.dom.LayoutFlag.SizeX) != 0) this.m_element.set_width(pw * this.m_width);
		if((this.m_flag & haxor.dom.LayoutFlag.SizeY) != 0) this.m_element.set_height(ph * this.m_height);
		this.m_lock = false;
	}
	,__class__: haxor.dom.DOMLayout
};
haxor.dom.DOMStage = function(p_container) {
	haxor.dom.DOMStage.m_instance = this;
	haxor.dom.Container.call(this,p_container,"stage");
	haxor.context.EngineContext.resize.Add(this);
};
$hxClasses["haxor.dom.DOMStage"] = haxor.dom.DOMStage;
haxor.dom.DOMStage.__name__ = ["haxor","dom","DOMStage"];
haxor.dom.DOMStage.__interfaces__ = [haxor.core.IResizeable];
haxor.dom.DOMStage.BuildStep = function(n,p) {
	var e = null;
	if(n == null) return false;
	if(p != null) {
		var _g = n.nodeName.toLowerCase();
		switch(_g) {
		case "container":
			e = haxor.dom.DOMStage.BuildContainer(n);
			break;
		case "sprite":
			e = haxor.dom.DOMStage.BuildSprite(n);
			break;
		}
		if(e != null) p.AddChild(e); else if(p.m_element != null) {
			if(n.getAttribute("script") == null) {
				if(p.m_element != n) {
					p.m_element.appendChild(n);
					return true;
				}
			}
		}
	}
	if(js.Boot.__instanceof(e,haxor.dom.Container)) {
		var l = n.children;
		var i = 0;
		while(i < l.length) {
			var it = l.item(i);
			var is_dom = haxor.dom.DOMStage.BuildStep(it,e);
			if(is_dom) i--;
			i++;
		}
	}
	return false;
};
haxor.dom.DOMStage.BuildSprite = function(n) {
	var a_src = haxor.dom.DOMStage._ss(n.getAttribute("src"));
	var a_canvas = n.getAttribute("canvas") != null;
	var a_pattern = n.getAttribute("pattern") != null;
	var res = new haxor.dom.Sprite(a_src,a_canvas);
	res.set_pattern(a_pattern);
	haxor.dom.DOMStage.BuildDOMEntity(n,res);
	return res;
};
haxor.dom.DOMStage.BuildContainer = function(n) {
	var res = new haxor.dom.Container();
	haxor.dom.DOMStage.BuildDOMEntity(n,res);
	return res;
};
haxor.dom.DOMStage.BuildDOMEntity = function(n,e) {
	var sa;
	sa = n.getAttribute("name");
	if(sa != null) {
		if(sa != "") e.set_name(haxor.dom.DOMStage._ss(sa));
	}
	sa = n.getAttribute("style");
	if(sa != null) {
		if(sa != "") e.m_element.style.cssText = sa;
	}
	if(e.m_element != null) e.m_element.style.position = "absolute";
	var pivot = haxor.dom.DOMStage._tv(n.getAttribute("px"),n.getAttribute("py"),n.getAttribute("pxy"));
	var position = haxor.dom.DOMStage._tv(n.getAttribute("x"),n.getAttribute("y"),n.getAttribute("xy"));
	var scale = haxor.dom.DOMStage._tv(n.getAttribute("sx"),n.getAttribute("sy"),n.getAttribute("sxy"),1,1);
	var size = haxor.dom.DOMStage._tv(n.getAttribute("w"),n.getAttribute("h"),n.getAttribute("wh"));
	var tv;
	var v = [0];
	var fx;
	var fy;
	tv = scale;
	e.set_sx(tv[2]);
	e.set_sy(tv[3]);
	tv = pivot;
	fx = haxor.dom.LayoutFlag.PivotX;
	fy = haxor.dom.LayoutFlag.PivotY;
	if(tv[0] > 0) {
		var _g = e.get_layout();
		_g.set_flag(_g.m_flag | fx);
		e.get_layout().set_px(tv[2]);
	} else e.set_px(tv[2]);
	if(tv[1] > 0) {
		var _g1 = e.get_layout();
		_g1.set_flag(_g1.m_flag | fy);
		e.get_layout().set_py(tv[3]);
	} else e.set_py(tv[3]);
	tv = position;
	fx = haxor.dom.LayoutFlag.PositionX;
	fy = haxor.dom.LayoutFlag.PositionY;
	if(tv[0] > 0) {
		var _g2 = e.get_layout();
		_g2.set_flag(_g2.m_flag | fx);
		e.get_layout().set_x(tv[2]);
	} else e.set_x(tv[2]);
	if(tv[1] > 0) {
		var _g3 = e.get_layout();
		_g3.set_flag(_g3.m_flag | fy);
		e.get_layout().set_y(tv[3]);
	} else e.set_y(tv[3]);
	tv = size;
	fx = haxor.dom.LayoutFlag.SizeX;
	fy = haxor.dom.LayoutFlag.SizeY;
	if(tv[0] > 0) {
		var _g4 = e.get_layout();
		_g4.set_flag(_g4.m_flag | fx);
		e.get_layout().set_width(tv[2]);
	} else e.set_width(tv[2]);
	if(tv[1] > 0) {
		var _g5 = e.get_layout();
		_g5.set_flag(_g5.m_flag | fy);
		e.get_layout().set_height(tv[3]);
	} else e.set_height(tv[3]);
	haxor.dom.DOMStage._sn(n.getAttribute("alpha"),v,1.0);
	e.set_alpha(v[0]);
	haxor.dom.DOMStage._sn(n.getAttribute("rotation"),v,0.0);
	e.set_rotation(v[0]);
	sa = n.getAttribute("margin");
	if(sa != null) {
		if(sa != "") {
			var mtk = sa.split(" ");
			var m = e.get_layout().m_margin;
			var n1 = 0.0;
			if(mtk.length == 1) {
				n1 = Std.parseFloat(mtk[0]);
				m.Set(n1,n1,n1,n1);
			} else {
				if(mtk.length >= 1) {
					n1 = Std.parseFloat(mtk[0]);
					m.set_xMin(n1);
				}
				if(mtk.length >= 2) {
					n1 = Std.parseFloat(mtk[1]);
					m.set_xMax(n1);
				}
				if(mtk.length >= 3) {
					n1 = Std.parseFloat(mtk[2]);
					m.set_yMin(n1);
				}
				if(mtk.length >= 4) {
					n1 = Std.parseFloat(mtk[3]);
					m.set_yMax(n1);
				}
			}
			e.get_layout().set_margin(m);
		}
	}
};
haxor.dom.DOMStage._tv = function(sx,sy,sxy,v0,v1) {
	if(v1 == null) v1 = 0.0;
	if(v0 == null) v0 = 0.0;
	var res = [0,0,0,0];
	var v = [0];
	var ixr = false;
	var iyr = false;
	if(sxy != null) {
		var sl = sxy.split(" ");
		if(sl.length == 1) {
			ixr = ixr || haxor.dom.DOMStage._sn(sl[0],v);
			iyr = iyr || ixr;
			res[2] = v[0];
			res[3] = v[0];
		}
		if(sl.length >= 2) {
			ixr = ixr || haxor.dom.DOMStage._sn(sl[0],v);
			res[2] = v[0];
			iyr = iyr || haxor.dom.DOMStage._sn(sl[1],v);
			res[3] = v[0];
		}
	} else {
		if(sx != null) {
			ixr = ixr || haxor.dom.DOMStage._sn(sx,v);
			res[2] = v[0];
		}
		if(sy != null) {
			iyr = iyr || haxor.dom.DOMStage._sn(sy,v);
			res[3] = v[0];
		}
	}
	if(sxy == null) {
		if(sx == null) res[2] = v0;
	}
	if(sxy == null) {
		if(sy == null) res[3] = v1;
	}
	if(ixr) if(haxor.math.Mathf.Abs(res[2]) <= 0.000001) res[2] = 0.0; else res[2] = res[2] / 100;
	if(iyr) if(haxor.math.Mathf.Abs(res[3]) <= 0.000001) res[3] = 0.0; else res[3] = res[3] / 100;
	if(ixr) res[0] = 1; else res[0] = 0;
	if(iyr) res[1] = 1; else res[1] = 0;
	return res;
};
haxor.dom.DOMStage._sn = function(s,v,n) {
	if(s == null) {
		v[0] = n;
		return false;
	}
	var isr = false;
	if(s.indexOf("%") >= 0) {
		isr = true;
		s = StringTools.replace(s,"%","");
	}
	v[0] = Std.parseFloat(s);
	return isr;
};
haxor.dom.DOMStage._ss = function(s) {
	if(s == null) return "";
	if(s.indexOf("@") == 0) return haxor.io.file.Asset.Get(HxOverrides.substr(s,1,null)); else return s;
};
haxor.dom.DOMStage.__super__ = haxor.dom.Container;
haxor.dom.DOMStage.prototype = $extend(haxor.dom.Container.prototype,{
	set_width: function(v) {
		return v;
	}
	,set_height: function(v) {
		return v;
	}
	,OnResize: function(p_width,p_height) {
		this.m_width = p_width;
		this.m_height = p_height;
		this.UpdateRect();
	}
	,__class__: haxor.dom.DOMStage
});
haxor.dom.LayoutFlag = function() { };
$hxClasses["haxor.dom.LayoutFlag"] = haxor.dom.LayoutFlag;
haxor.dom.LayoutFlag.__name__ = ["haxor","dom","LayoutFlag"];
haxor.dom.Sprite = function(p_src,p_use_canvas,p_name) {
	if(p_name == null) p_name = "";
	if(p_use_canvas == null) p_use_canvas = false;
	this.m_pattern = false;
	this.m_slices = [];
	this.m_src = "";
	var e = null;
	if(p_use_canvas) {
		var c;
		var _this = window.document;
		c = _this.createElement("canvas");
		c.style.position = "absolute";
		this._rc = c.getContext("2d");
		e = c;
	}
	var img = new Image();
	if(p_src != "") {
		img.src = this.m_src = p_src;
		img.style.backgroundImage = "url(" + this.m_src + ")";
		img.style.backgroundRepeat = "repeat";
		this.set_image(img);
	}
	if(e == null) e = img;
	haxor.dom.Container.call(this,e,p_name);
};
$hxClasses["haxor.dom.Sprite"] = haxor.dom.Sprite;
haxor.dom.Sprite.__name__ = ["haxor","dom","Sprite"];
haxor.dom.Sprite.__super__ = haxor.dom.Container;
haxor.dom.Sprite.prototype = $extend(haxor.dom.Container.prototype,{
	get_slices: function() {
		return this.m_slices.slice();
	}
	,set_slices: function(v) {
		if(v == null) this.m_slices = v = []; else this.m_slices = v.slice();
		this.OnRepaint();
		return v;
	}
	,get_image: function() {
		return this.m_image;
	}
	,set_image: function(v) {
		var _g = this;
		if(this.m_image == v) return v;
		this.m_image = v;
		var olc = function() {
			if(_g.get_width() <= 0) _g.set_width(_g.m_image.naturalWidth);
			if(_g.get_height() <= 0) _g.set_height(_g.m_image.naturalHeight);
			_g.m_image.onload = null;
		};
		this.m_image.onload = olc;
		if(this.get_width() <= 0) this.set_width(this.m_image.naturalWidth);
		if(this.get_height() <= 0) this.set_height(this.m_image.naturalHeight);
		if(this.m_image == null) return v;
		this.OnRepaint();
		return v;
	}
	,set_pattern: function(v) {
		if(this.m_pattern == v) return v;
		this.m_pattern = v;
		this.OnRepaint();
		return v;
	}
	,get_pattern: function() {
		return this.m_pattern;
	}
	,OnRepaint: function() {
		haxor.dom.Container.prototype.OnRepaint.call(this);
		if(this.m_image == null) return;
		if(this.m_element == null) return;
		if(this._rc == null) {
			if(this.m_pattern) {
				this.m_image.src = "";
				this.m_image.style.backgroundImage = "url(" + this.m_src + ")";
				this.m_image.style.backgroundRepeat = "repeat";
			} else {
				this.m_image.src = this.m_src;
				this.m_image.style.removeProperty("background-image");
			}
		} else {
			var c = this.m_element;
			c.width = this.m_width - (this.get_layout().get_margin().get_xMin() + this.get_layout().get_margin().get_xMax());
			c.height = this.m_height - (this.get_layout().get_margin().get_yMin() + this.get_layout().get_margin().get_yMax());
			if(!this.m_pattern) this.DrawSlicedImage(this._rc,this.m_image,c.width,c.height,this.m_slices); else {
				var p = this._rc.createPattern(this.m_image,"repeat");
				this._rc.rect(0,0,c.width,c.height);
				this._rc.fillStyle = p;
				this._rc.fill();
			}
		}
	}
	,DrawSlicedImage: function(p_graphics,p_image,w,h,p_slices) {
		if(p_image == null) return;
		if(p_slices == null) p_slices = []; else p_slices = p_slices;
		var c = p_graphics.canvas;
		var iw = p_image.naturalWidth;
		var ih = p_image.naturalHeight;
		var w1 = c.width;
		var h1 = c.height;
		var l;
		if(p_slices.length <= 0) l = 0; else if(p_slices.length <= 1) l = p_slices[0]; else l = p_slices[0];
		l = Math.min(l,w1 / 2);
		var r;
		if(p_slices.length <= 0) r = 0; else if(p_slices.length <= 1) r = p_slices[0]; else r = p_slices[1];
		r = Math.min(r,w1 / 2);
		var t;
		if(p_slices.length <= 0) t = 0; else if(p_slices.length <= 1) t = p_slices[0]; else t = p_slices[2];
		t = Math.min(t,h1 / 2);
		var b;
		if(p_slices.length <= 0) b = 0; else if(p_slices.length <= 1) b = p_slices[0]; else b = p_slices[3];
		b = Math.min(b,h1 / 2);
		var ix0 = 0;
		var iy0 = 0;
		var iw0 = l;
		var ih0 = t;
		var ix1 = l;
		var iy1 = 0;
		var iw1 = Math.max(1,iw - l - r);
		var ih1 = t;
		var ix2 = Math.max(1,iw - r);
		var iy2 = 0;
		var iw2 = r;
		var ih2 = t;
		var ix3 = 0;
		var iy3 = t;
		var iw3 = l;
		var ih3 = Math.max(1,ih - t - b);
		var ix4 = l;
		var iy4 = t;
		var iw4 = Math.max(1,iw - l - r);
		var ih4 = Math.max(1,ih - t - b);
		var ix5 = Math.max(1,iw - r);
		var iy5 = t;
		var iw5 = r;
		var ih5 = Math.max(1,ih - t - b);
		var ix6 = 0;
		var iy6 = Math.max(1,ih - b);
		var iw6 = l;
		var ih6 = b;
		var ix7 = l;
		var iy7 = Math.max(1,ih - b);
		var iw7 = Math.max(1,iw - l - r);
		var ih7 = b;
		var ix8 = Math.max(1,iw - r);
		var iy8 = Math.max(1,ih - b);
		var iw8 = r;
		var ih8 = b;
		var x0 = 0;
		var y0 = 0;
		var w0 = l;
		var h0 = t;
		var x1 = l;
		var y1 = 0;
		var w11 = Math.max(0,w1 - l - r);
		var h11 = t;
		var x2 = Math.max(0,w1 - r);
		var y2 = 0;
		var w2 = r;
		var h2 = t;
		var x3 = 0;
		var y3 = t;
		var w3 = l;
		var h3 = Math.max(0,h1 - t - b);
		var x4 = l;
		var y4 = t;
		var w4 = Math.max(0,w1 - l - r);
		var h4 = Math.max(0,h1 - t - b);
		var x5 = Math.max(0,w1 - r);
		var y5 = t;
		var w5 = r;
		var h5 = Math.max(0,h1 - t - b);
		var x6 = 0;
		var y6 = Math.max(0,h1 - b);
		var w6 = l;
		var h6 = b;
		var x7 = l;
		var y7 = Math.max(0,h1 - b);
		var w7 = Math.max(0,w1 - l - r);
		var h7 = b;
		var x8 = Math.max(0,w1 - r);
		var y8 = Math.max(0,h1 - b);
		var w8 = r;
		var h8 = b;
		if(l > 0) {
			if(t > 0) p_graphics.drawImage(p_image,ix0,iy0,iw0,ih0,x0,y0,w0,h0);
		}
		if(t > 0) p_graphics.drawImage(p_image,ix1,iy1,iw1,ih1,x1,y1,w11,h11);
		if(r > 0) {
			if(t > 0) p_graphics.drawImage(p_image,ix2,iy2,iw2,ih2,x2,y2,w2,h2);
		}
		if(l > 0) p_graphics.drawImage(p_image,ix3,iy3,iw3,ih3,x3,y3,w3,h3);
		p_graphics.drawImage(p_image,ix4,iy4,iw4,ih4,x4,y4,w4,h4);
		if(r > 0) p_graphics.drawImage(p_image,ix5,iy5,iw5,ih5,x5,y5,w5,h5);
		if(l > 0) {
			if(b > 0) p_graphics.drawImage(p_image,ix6,iy6,iw6,ih6,x6,y6,w6,h6);
		}
		if(b > 0) p_graphics.drawImage(p_image,ix7,iy7,iw7,ih7,x7,y7,w7,h7);
		if(r > 0) {
			if(b > 0) p_graphics.drawImage(p_image,ix8,iy8,iw8,ih8,x8,y8,w8,h8);
		}
	}
	,__class__: haxor.dom.Sprite
});
haxor.ds = {};
haxor.ds.SAP = function(p_bias,p_has_query) {
	if(p_has_query == null) p_has_query = true;
	if(p_bias == null) p_bias = 0.0;
	this.m_has_query = p_has_query;
	this.x = new haxor.ds.SAPList(p_bias,this.m_has_query);
	this.y = new haxor.ds.SAPList(p_bias,this.m_has_query);
	this.z = new haxor.ds.SAPList(p_bias,this.m_has_query);
	this.inside = [];
	this.outside = [];
	this.countIn = 0;
	this.countOut = 0;
};
$hxClasses["haxor.ds.SAP"] = haxor.ds.SAP;
haxor.ds.SAP.__name__ = ["haxor","ds","SAP"];
haxor.ds.SAP.prototype = {
	Create: function(p_id) {
		this.x.Create(p_id);
		this.y.Create(p_id);
		this.z.Create(p_id);
		while(this.inside.length <= p_id) {
			this.inside.push(-1);
			this.outside.push(-1);
		}
	}
	,Update: function(p_id,p_data,p_min,p_max) {
		this.x.Update(p_id,p_data,p_min.x,p_max.x);
		this.y.Update(p_id,p_data,p_min.y,p_max.y);
		this.z.Update(p_id,p_data,p_min.z,p_max.z);
	}
	,Remove: function(p_id) {
		this.x.RemoveById(p_id);
		this.y.RemoveById(p_id);
		this.z.RemoveById(p_id);
	}
	,Overlap: function(p_a,p_b) {
		var ax = this.x.list[p_a];
		var bx = this.x.list[p_b];
		if(!ax.Overlap(bx)) return true;
		var ay = this.y.list[p_a];
		var by = this.y.list[p_b];
		if(!ay.Overlap(by)) return true;
		var az = this.z.list[p_a];
		var bz = this.z.list[p_b];
		if(!az.Overlap(bz)) return true;
		return false;
	}
	,Query: function(p_id,p_outside) {
		if(p_outside == null) p_outside = false;
		if(!this.m_has_query) return;
		this.countIn = 0;
		this.countOut = 0;
		var tx;
		var ty;
		var tz;
		var it;
		var nx;
		var ny;
		var nz;
		tx = this.x.list[p_id];
		ty = this.y.list[p_id];
		tz = this.z.list[p_id];
		it = tx.next;
		while(it != null) {
			if(it.Overlap(tx)) {
				if(this.y.list[it.id].Overlap(ty)) {
					if(this.z.list[it.id].Overlap(tz)) this.inside[this.countIn++] = it.id; else if(p_outside) this.outside[this.countOut++] = it.id;
				} else if(p_outside) this.outside[this.countOut++] = it.id;
			} else if(p_outside) this.outside[this.countOut++] = it.id;
			it = it.next;
		}
		it = tx.prev;
		while(it != null) {
			if(it.Overlap(tx)) {
				if(this.y.list[it.id].Overlap(ty)) {
					if(this.z.list[it.id].Overlap(tz)) this.inside[this.countIn++] = it.id; else if(p_outside) this.outside[this.countOut++] = it.id;
				} else if(p_outside) this.outside[this.countOut++] = it.id;
			} else if(p_outside) this.outside[this.countOut++] = it.id;
			it = it.prev;
		}
	}
	,__class__: haxor.ds.SAP
};
haxor.ds.SAPList = function(p_bias,p_has_query) {
	if(p_has_query == null) p_has_query = true;
	if(p_bias == null) p_bias = 0.0;
	this.list = [];
	var _g = 0;
	while(_g < 5000) {
		var i = _g++;
		this.list.push(null);
	}
	this.m_has_query = p_has_query;
	this.m_bias = p_bias;
};
$hxClasses["haxor.ds.SAPList"] = haxor.ds.SAPList;
haxor.ds.SAPList.__name__ = ["haxor","ds","SAPList"];
haxor.ds.SAPList.prototype = {
	Create: function(p_id) {
		while(this.list.length <= p_id) this.list.push(null);
		if(this.list[p_id] == null) this.list[p_id] = new haxor.ds.SAPInterval();
	}
	,Update: function(p_id,p_data,p_min,p_max) {
		this.list[p_id].id = p_id;
		this.list[p_id].data = p_data;
		var d = (p_max - p_min) * this.m_bias * 0.5;
		this.list[p_id].Set(p_min - d,p_max + d);
		if(this.m_has_query) this.Relocate(this.list[p_id]);
	}
	,Add: function(p_item) {
		if(this.start == null) {
			this.start = p_item;
			p_item.next = p_item.prev = null;
			return;
		}
		if(p_item == this.start) return;
		var it = this.start;
		while(it != null) {
			if(p_item.min < it.min) {
				this.Insert(p_item,it);
				return;
			}
			if(it.next == null) {
				this.Insert(p_item,it);
				return;
			}
			it = it.next;
		}
	}
	,Insert: function(p_item,p_at) {
		if(p_item == p_at) return;
		if(p_item.min > p_at.min) {
			p_item.next = p_at.next;
			p_item.prev = p_at;
			p_at.next = p_item;
			if(p_item.next != null) p_item.next.prev = p_item;
		} else {
			p_item.next = p_at;
			p_item.prev = p_at.prev;
			p_at.prev = p_item;
			if(p_item.prev != null) p_item.prev.next = p_item;
			if(p_at == this.start) this.start = p_item;
		}
	}
	,Relocate: function(p_item) {
		if(p_item.prev == null) {
			if(p_item.next == null) {
				this.Add(p_item);
				return;
			}
		}
		var it = p_item;
		var nav = 0;
		var location = null;
		while(it != null) {
			var n = it.next;
			var p = it.prev;
			if(n == null) {
				if(p == null) break;
			}
			if(p != null) {
				if(p_item.min < p.min) {
					nav = -1;
					location = p;
				}
			}
			if(n != null) {
				if(p_item.min > n.min) {
					nav = 1;
					location = n;
				}
			}
			if(nav == 0) break;
			if(nav < 0) it = p; else it = n;
			nav = 0;
		}
		if(location != null) {
			this.Remove(p_item);
			this.Insert(p_item,location);
		}
	}
	,RemoveById: function(p_id) {
		this.Remove(this.list[p_id]);
	}
	,Remove: function(p_item) {
		if(!this.m_has_query) return;
		var p = p_item.prev;
		var n = p_item.next;
		if(p != null) p.next = n;
		if(n != null) n.prev = p;
		p_item.next = p_item.prev = null;
		if(p_item == this.start) this.start = n;
	}
	,ToString: function(p_places) {
		if(p_places == null) p_places = 2;
		var s = "";
		if(this.m_has_query) {
			var it = this.start;
			while(it != null) {
				s += it.ToString(p_places);
				it = it.next;
			}
		} else {
			var _g1 = 0;
			var _g = this.list.length;
			while(_g1 < _g) {
				var i = _g1++;
				s += this.list[i].ToString(p_places);
			}
		}
		return s;
	}
	,__class__: haxor.ds.SAPList
};
haxor.ds.SAPInterval = function() {
	this.min = 0.0;
	this.max = 0.0;
	this.id = 0;
};
$hxClasses["haxor.ds.SAPInterval"] = haxor.ds.SAPInterval;
haxor.ds.SAPInterval.__name__ = ["haxor","ds","SAPInterval"];
haxor.ds.SAPInterval.prototype = {
	Set: function(p_min,p_max) {
		this.min = p_min;
		this.max = p_max;
	}
	,Overlap: function(p_interval) {
		if(p_interval.min > this.min) return p_interval.min <= this.max;
		return p_interval.max >= this.min;
	}
	,ToString: function(p_places) {
		if(p_places == null) p_places = 2;
		return "[" + haxor.math.Mathf.RoundPlaces(this.min,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.max,p_places) + "]";
	}
	,__class__: haxor.ds.SAPInterval
};
haxor.graphics = {};
haxor.graphics.GL = function() { };
$hxClasses["haxor.graphics.GL"] = haxor.graphics.GL;
haxor.graphics.GL.__name__ = ["haxor","graphics","GL"];
haxor.graphics.GL.get_api = function() {
	return haxor.graphics.GL.m_gl.get_api();
};
haxor.graphics.GL.Initialize = function(p_application) {
	haxor.graphics.GL.m_gl = new haxor.platform.html.graphics.WebGL(p_application);
};
haxor.graphics.GL.Resize = function() {
	haxor.graphics.GL.m_gl.Resize();
};
haxor.graphics.GL.BindBuffer = function(p_target,p_id) {
	haxor.graphics.GL.m_gl.BindBuffer(p_target,p_id);
};
haxor.graphics.GL.BufferData = function(p_target,p_data,p_mode) {
	haxor.graphics.GL.m_gl.BufferData(p_target,p_data,p_mode);
};
haxor.graphics.GL.BufferSubData = function(p_target,p_offset,p_data) {
	haxor.graphics.GL.m_gl.BufferSubData(p_target,p_offset,p_data);
};
haxor.graphics.GL.CreateBuffer = function() {
	return haxor.graphics.GL.m_gl.CreateBuffer();
};
haxor.graphics.GL.DrawArrays = function(p_primitive,p_start,p_count) {
	haxor.graphics.GL.m_gl.DrawArrays(p_primitive,p_start,p_count);
};
haxor.graphics.GL.DrawElements = function(p_primitive,p_count,p_type,p_offset) {
	haxor.graphics.GL.m_gl.DrawElements(p_primitive,p_count,p_type,p_offset);
};
haxor.graphics.GL.DeleteBuffer = function(p_id) {
	haxor.graphics.GL.m_gl.DeleteBuffer(p_id);
};
haxor.graphics.GL.DisableVertexAttrib = function(p_location) {
	haxor.graphics.GL.m_gl.DisableVertexAttrib(p_location);
};
haxor.graphics.GL.EnableVertexAttrib = function(p_location) {
	haxor.graphics.GL.m_gl.EnableVertexAttrib(p_location);
};
haxor.graphics.GL.VertexAttrib3f = function(p_location,p_x,p_y,p_z) {
	haxor.graphics.GL.m_gl.VertexAttrib3f(p_location,p_x,p_y,p_z);
};
haxor.graphics.GL.VertexAttrib4f = function(p_location,p_x,p_y,p_z,p_w) {
	haxor.graphics.GL.m_gl.VertexAttrib4f(p_location,p_x,p_y,p_z,p_w);
};
haxor.graphics.GL.VertexAttribPointer = function(p_location,p_components_size,p_type,p_normalized,p_stride,p_offset) {
	haxor.graphics.GL.m_gl.VertexAttribPointer(p_location,p_components_size,p_type,p_normalized,p_stride,p_offset);
};
haxor.graphics.GL.CompileShader = function(p_shader) {
	haxor.graphics.GL.m_gl.CompileShader(p_shader);
};
haxor.graphics.GL.CreateShader = function(p_type) {
	return haxor.graphics.GL.m_gl.CreateShader(p_type);
};
haxor.graphics.GL.DetachShader = function(p_program,p_shader) {
	haxor.graphics.GL.m_gl.DetachShader(p_program,p_shader);
};
haxor.graphics.GL.DeleteShader = function(p_shader) {
	haxor.graphics.GL.m_gl.DeleteShader(p_shader);
};
haxor.graphics.GL.GetShaderInfoLog = function(p_shader) {
	return haxor.graphics.GL.m_gl.GetShaderInfoLog(p_shader);
};
haxor.graphics.GL.GetShaderParameter = function(p_shader,p_parameter) {
	return haxor.graphics.GL.m_gl.GetShaderParameter(p_shader,p_parameter);
};
haxor.graphics.GL.ShaderSource = function(p_shader,p_source) {
	haxor.graphics.GL.m_gl.ShaderSource(p_shader,p_source);
};
haxor.graphics.GL.AttachShader = function(p_program,p_shader) {
	haxor.graphics.GL.m_gl.AttachShader(p_program,p_shader);
};
haxor.graphics.GL.BindAttribLocation = function(p_program,p_location,p_name) {
	haxor.graphics.GL.m_gl.BindAttribLocation(p_program,p_location,p_name);
};
haxor.graphics.GL.CreateProgram = function() {
	return haxor.graphics.GL.m_gl.CreateProgram();
};
haxor.graphics.GL.DeleteProgram = function(p_program) {
	haxor.graphics.GL.m_gl.DeleteProgram(p_program);
};
haxor.graphics.GL.GetAttribLocation = function(p_program,p_name) {
	return haxor.graphics.GL.m_gl.GetAttribLocation(p_program,p_name);
};
haxor.graphics.GL.GetUniformLocation = function(p_program,p_name) {
	return haxor.graphics.GL.m_gl.GetUniformLocation(p_program,p_name);
};
haxor.graphics.GL.GetProgramInfoLog = function(p_program) {
	return haxor.graphics.GL.m_gl.GetProgramInfoLog(p_program);
};
haxor.graphics.GL.GetProgramParameter = function(p_program,p_parameter) {
	return haxor.graphics.GL.m_gl.GetProgramParameter(p_program,p_parameter);
};
haxor.graphics.GL.LinkProgram = function(p_program) {
	haxor.graphics.GL.m_gl.LinkProgram(p_program);
};
haxor.graphics.GL.UseProgram = function(p_program) {
	haxor.graphics.GL.m_gl.UseProgram(p_program);
};
haxor.graphics.GL.ActiveTexture = function(p_slot) {
	haxor.graphics.GL.m_gl.ActiveTexture(p_slot);
};
haxor.graphics.GL.BindFramebuffer = function(p_target,p_id) {
	haxor.graphics.GL.m_gl.BindFramebuffer(p_target,p_id);
};
haxor.graphics.GL.BindRenderbuffer = function(p_target,p_id) {
	haxor.graphics.GL.m_gl.BindRenderbuffer(p_target,p_id);
};
haxor.graphics.GL.BindTexture = function(p_target,p_id) {
	haxor.graphics.GL.m_gl.BindTexture(p_target,p_id);
};
haxor.graphics.GL.CreateFramebuffer = function() {
	return haxor.graphics.GL.m_gl.CreateFramebuffer();
};
haxor.graphics.GL.CreateRenderbuffer = function() {
	return haxor.graphics.GL.m_gl.CreateRenderbuffer();
};
haxor.graphics.GL.CreateTexture = function() {
	return haxor.graphics.GL.m_gl.CreateTexture();
};
haxor.graphics.GL.DeleteFramebuffer = function(p_id) {
	haxor.graphics.GL.m_gl.DeleteFramebuffer(p_id);
};
haxor.graphics.GL.DeleteRenderbuffer = function(p_id) {
	haxor.graphics.GL.m_gl.DeleteRenderbuffer(p_id);
};
haxor.graphics.GL.DeleteTexture = function(p_id) {
	haxor.graphics.GL.m_gl.DeleteTexture(p_id);
};
haxor.graphics.GL.FramebufferRenderbuffer = function(p_target,p_attachment,p_renderbuffer_target,p_renderbuffer_id) {
	haxor.graphics.GL.m_gl.FramebufferRenderbuffer(p_target,p_attachment,p_renderbuffer_target,p_renderbuffer_id);
};
haxor.graphics.GL.FramebufferTexture2D = function(p_target,p_attachment,p_texture_target,p_texture_id,p_miplevel) {
	haxor.graphics.GL.m_gl.FramebufferTexture2D(p_target,p_attachment,p_texture_target,p_texture_id,p_miplevel);
};
haxor.graphics.GL.GenerateMipmap = function(p_target) {
	haxor.graphics.GL.m_gl.GenerateMipmap(p_target);
};
haxor.graphics.GL.PixelStorei = function(p_parameter,p_value) {
	haxor.graphics.GL.m_gl.PixelStorei(p_parameter,p_value);
};
haxor.graphics.GL.RenderbufferStorage = function(p_target,p_format,p_width,p_height) {
	haxor.graphics.GL.m_gl.RenderbufferStorage(p_target,p_format,p_width,p_height);
};
haxor.graphics.GL.TexImage2D = function(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type,p_data) {
	haxor.graphics.GL.m_gl.TexImage2D(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type,p_data);
};
haxor.graphics.GL.TexImage2DAlloc = function(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type) {
	haxor.graphics.GL.m_gl.TexImage2DAlloc(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type);
};
haxor.graphics.GL.TexSubImage2D = function(p_target,p_level,p_x,p_y,p_width,p_height,p_format,p_channel_type,p_data) {
	haxor.graphics.GL.m_gl.TexSubImage2D(p_target,p_level,p_x,p_y,p_width,p_height,p_format,p_channel_type,p_data);
};
haxor.graphics.GL.TexStorage2D = function(p_target,p_num_mipmaps,p_channels,p_width,p_height) {
	haxor.graphics.GL.m_gl.TexStorage2D(p_target,p_num_mipmaps,p_channels,p_width,p_height);
};
haxor.graphics.GL.TexParameterf = function(p_target,p_parameter,p_value) {
	haxor.graphics.GL.m_gl.TexParameterf(p_target,p_parameter,p_value);
};
haxor.graphics.GL.TexParameteri = function(p_target,p_parameter,p_value) {
	haxor.graphics.GL.m_gl.TexParameteri(p_target,p_parameter,p_value);
};
haxor.graphics.GL.Uniform1f = function(p_location,p_x) {
	haxor.graphics.GL.m_gl.Uniform1f(p_location,p_x);
};
haxor.graphics.GL.Uniform2f = function(p_location,p_x,p_y) {
	haxor.graphics.GL.m_gl.Uniform2f(p_location,p_x,p_y);
};
haxor.graphics.GL.Uniform3f = function(p_location,p_x,p_y,p_z) {
	haxor.graphics.GL.m_gl.Uniform3f(p_location,p_x,p_y,p_z);
};
haxor.graphics.GL.Uniform4f = function(p_location,p_x,p_y,p_z,p_w) {
	haxor.graphics.GL.m_gl.Uniform4f(p_location,p_x,p_y,p_z,p_w);
};
haxor.graphics.GL.Uniform1i = function(p_location,p_x) {
	haxor.graphics.GL.m_gl.Uniform1i(p_location,p_x);
};
haxor.graphics.GL.Uniform2i = function(p_location,p_x,p_y) {
	haxor.graphics.GL.m_gl.Uniform2i(p_location,p_x,p_y);
};
haxor.graphics.GL.Uniform3i = function(p_location,p_x,p_y,p_z) {
	haxor.graphics.GL.m_gl.Uniform3i(p_location,p_x,p_y,p_z);
};
haxor.graphics.GL.Uniform4i = function(p_location,p_x,p_y,p_z,p_w) {
	haxor.graphics.GL.m_gl.Uniform4i(p_location,p_x,p_y,p_z,p_w);
};
haxor.graphics.GL.Uniform1fv = function(p_location,p_v) {
	haxor.graphics.GL.m_gl.Uniform1fv(p_location,p_v);
};
haxor.graphics.GL.Uniform2fv = function(p_location,p_v) {
	haxor.graphics.GL.m_gl.Uniform2fv(p_location,p_v);
};
haxor.graphics.GL.Uniform3fv = function(p_location,p_v) {
	haxor.graphics.GL.m_gl.Uniform3fv(p_location,p_v);
};
haxor.graphics.GL.Uniform4fv = function(p_location,p_v) {
	haxor.graphics.GL.m_gl.Uniform4fv(p_location,p_v);
};
haxor.graphics.GL.Uniform1iv = function(p_location,p_v) {
	haxor.graphics.GL.m_gl.Uniform1iv(p_location,p_v);
};
haxor.graphics.GL.Uniform2iv = function(p_location,p_v) {
	haxor.graphics.GL.m_gl.Uniform2iv(p_location,p_v);
};
haxor.graphics.GL.Uniform3iv = function(p_location,p_v) {
	haxor.graphics.GL.m_gl.Uniform3iv(p_location,p_v);
};
haxor.graphics.GL.Uniform4iv = function(p_location,p_v) {
	haxor.graphics.GL.m_gl.Uniform4iv(p_location,p_v);
};
haxor.graphics.GL.UniformMatrix2fv = function(p_location,p_transpose,p_v) {
	haxor.graphics.GL.m_gl.UniformMatrix2fv(p_location,p_transpose,p_v);
};
haxor.graphics.GL.UniformMatrix3fv = function(p_location,p_transpose,p_v) {
	haxor.graphics.GL.m_gl.UniformMatrix3fv(p_location,p_transpose,p_v);
};
haxor.graphics.GL.UniformMatrix4fv = function(p_location,p_transpose,p_v) {
	haxor.graphics.GL.m_gl.UniformMatrix4fv(p_location,p_transpose,p_v);
};
haxor.graphics.GL.BlendFunc = function(p_src,p_dst) {
	haxor.graphics.GL.m_gl.BlendFunc(p_src,p_dst);
};
haxor.graphics.GL.Disable = function(p_flag) {
	haxor.graphics.GL.m_gl.Disable(p_flag);
};
haxor.graphics.GL.Enable = function(p_flag) {
	haxor.graphics.GL.m_gl.Enable(p_flag);
};
haxor.graphics.GL.DepthMask = function(p_flag) {
	haxor.graphics.GL.m_gl.DepthMask(p_flag);
};
haxor.graphics.GL.DepthFunc = function(p_flag) {
	haxor.graphics.GL.m_gl.DepthFunc(p_flag);
};
haxor.graphics.GL.CullFace = function(p_face) {
	haxor.graphics.GL.m_gl.CullFace(p_face);
};
haxor.graphics.GL.FrontFace = function(p_face) {
	haxor.graphics.GL.m_gl.FrontFace(p_face);
};
haxor.graphics.GL.Clear = function(p_flag) {
	haxor.graphics.GL.m_gl.Clear(p_flag);
};
haxor.graphics.GL.ClearDepth = function(p_value) {
	haxor.graphics.GL.m_gl.ClearDepth(p_value);
};
haxor.graphics.GL.ClearColor = function(p_r,p_g,p_b,p_a) {
	haxor.graphics.GL.m_gl.ClearColor(p_r,p_g,p_b,p_a);
};
haxor.graphics.GL.Viewport = function(p_x,p_y,p_width,p_height) {
	haxor.graphics.GL.m_gl.Viewport(p_x,p_y,p_width,p_height);
};
haxor.graphics.GL.Scissor = function(p_x,p_y,p_width,p_height) {
	haxor.graphics.GL.m_gl.Scissor(p_x,p_y,p_width,p_height);
};
haxor.graphics.GL.ReadPixels = function(p_x,p_y,p_width,p_height,p_format,p_type,p_pixels) {
	haxor.graphics.GL.m_gl.ReadPixels(p_x,p_y,p_width,p_height,p_format,p_type,p_pixels);
};
haxor.graphics.GL.GetError = function() {
	return haxor.graphics.GL.m_gl.GetError();
};
haxor.graphics.GL.GetErrorCode = function() {
	return haxor.graphics.GL.m_gl.GetErrorCode();
};
haxor.graphics.GL.GetErrorString = function(p_code) {
	return haxor.graphics.GL.m_gl.GetErrorString(p_code);
};
haxor.graphics.GL.LogError = function() {
	haxor.graphics.GL.m_gl.LogError();
};
haxor.graphics.GL.Assert = function(p_log) {
};
haxor.graphics.GL.Flush = function() {
	null;
};
haxor.graphics.GL.Focus = function() {
	haxor.graphics.GL.m_gl.Focus();
};
haxor.graphics.GraphicAPI = { __ename__ : true, __constructs__ : ["None","OpenGL","OpenGLES","WebGL"] };
haxor.graphics.GraphicAPI.None = ["None",0];
haxor.graphics.GraphicAPI.None.__enum__ = haxor.graphics.GraphicAPI;
haxor.graphics.GraphicAPI.OpenGL = ["OpenGL",1];
haxor.graphics.GraphicAPI.OpenGL.__enum__ = haxor.graphics.GraphicAPI;
haxor.graphics.GraphicAPI.OpenGLES = ["OpenGLES",2];
haxor.graphics.GraphicAPI.OpenGLES.__enum__ = haxor.graphics.GraphicAPI;
haxor.graphics.GraphicAPI.WebGL = ["WebGL",3];
haxor.graphics.GraphicAPI.WebGL.__enum__ = haxor.graphics.GraphicAPI;
haxor.graphics.GraphicContext = function(p_application) {
	this.m_api = haxor.graphics.GraphicAPI.None;
	this.m_application = p_application;
};
$hxClasses["haxor.graphics.GraphicContext"] = haxor.graphics.GraphicContext;
haxor.graphics.GraphicContext.__name__ = ["haxor","graphics","GraphicContext"];
haxor.graphics.GraphicContext.prototype = {
	get_api: function() {
		return this.m_api;
	}
	,CheckExtensions: function() {
	}
	,Destroy: function() {
	}
	,Flush: function() {
	}
	,Focus: function() {
	}
	,Resize: function() {
	}
	,BindBuffer: function(p_target,p_id) {
	}
	,BufferData: function(p_target,p_data,p_mode) {
	}
	,BufferSubData: function(p_target,p_offset,p_data) {
	}
	,CreateBuffer: function() {
		return haxor.graphics.GL.INVALID;
	}
	,DeleteBuffer: function(p_id) {
	}
	,DrawArrays: function(p_primitive,p_start,p_count) {
	}
	,DrawElements: function(p_primitive,p_count,p_type,p_offset) {
	}
	,EnableVertexAttrib: function(p_location) {
	}
	,DisableVertexAttrib: function(p_location) {
	}
	,VertexAttrib3f: function(p_location,p_x,p_y,p_z) {
	}
	,VertexAttrib4f: function(p_location,p_x,p_y,p_z,p_w) {
	}
	,VertexAttribPointer: function(p_location,p_components_size,p_type,p_normalized,p_stride,p_offset) {
	}
	,CompileShader: function(p_shader) {
	}
	,CreateShader: function(p_type) {
		return haxor.graphics.GL.INVALID;
	}
	,DeleteShader: function(p_shader) {
	}
	,DetachShader: function(p_program,p_shader) {
	}
	,GetShaderInfoLog: function(p_shader) {
		return "";
	}
	,GetShaderParameter: function(p_shader,p_parameter) {
		return -1;
	}
	,ShaderSource: function(p_shader,p_source) {
	}
	,AttachShader: function(p_program,p_shader) {
	}
	,BindAttribLocation: function(p_program,p_location,p_name) {
	}
	,CreateProgram: function() {
		return haxor.graphics.GL.INVALID;
	}
	,DeleteProgram: function(p_program) {
	}
	,GetAttribLocation: function(p_program,p_name) {
		return -1;
	}
	,GetUniformLocation: function(p_program,p_name) {
		return haxor.graphics.GL.INVALID;
	}
	,GetProgramInfoLog: function(p_program) {
		return "";
	}
	,GetProgramParameter: function(p_program,p_parameter) {
		return -1;
	}
	,LinkProgram: function(p_program) {
	}
	,UseProgram: function(p_program) {
	}
	,Uniform1f: function(p_location,p_x) {
	}
	,Uniform2f: function(p_location,p_x,p_y) {
	}
	,Uniform3f: function(p_location,p_x,p_y,p_z) {
	}
	,Uniform4f: function(p_location,p_x,p_y,p_z,p_w) {
	}
	,Uniform1i: function(p_location,p_x) {
	}
	,Uniform2i: function(p_location,p_x,p_y) {
	}
	,Uniform3i: function(p_location,p_x,p_y,p_z) {
	}
	,Uniform4i: function(p_location,p_x,p_y,p_z,p_w) {
	}
	,Uniform1fv: function(p_location,p_v) {
	}
	,Uniform2fv: function(p_location,p_v) {
	}
	,Uniform3fv: function(p_location,p_v) {
	}
	,Uniform4fv: function(p_location,p_v) {
	}
	,Uniform1iv: function(p_location,p_v) {
	}
	,Uniform2iv: function(p_location,p_v) {
	}
	,Uniform3iv: function(p_location,p_v) {
	}
	,Uniform4iv: function(p_location,p_v) {
	}
	,UniformMatrix2fv: function(p_location,p_transpose,p_v) {
	}
	,UniformMatrix3fv: function(p_location,p_transpose,p_v) {
	}
	,UniformMatrix4fv: function(p_location,p_transpose,p_v) {
	}
	,ActiveTexture: function(p_slot) {
	}
	,BindFramebuffer: function(p_target,p_id) {
	}
	,BindRenderbuffer: function(p_target,p_id) {
	}
	,BindTexture: function(p_target,p_id) {
	}
	,CreateFramebuffer: function() {
		return haxor.graphics.GL.INVALID;
	}
	,CreateRenderbuffer: function() {
		return haxor.graphics.GL.INVALID;
	}
	,CreateTexture: function() {
		return haxor.graphics.GL.INVALID;
	}
	,DeleteFramebuffer: function(p_id) {
	}
	,DeleteRenderbuffer: function(p_id) {
	}
	,DeleteTexture: function(p_id) {
	}
	,FramebufferRenderbuffer: function(p_target,p_attachment,p_renderbuffer_target,p_renderbuffer_id) {
	}
	,FramebufferTexture2D: function(p_target,p_attachment,p_texture_target,p_texture_id,p_miplevel) {
	}
	,GenerateMipmap: function(p_target) {
	}
	,PixelStorei: function(p_parameter,p_value) {
	}
	,RenderbufferStorage: function(p_target,p_format,p_width,p_height) {
	}
	,TexImage2DAlloc: function(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type) {
	}
	,TexImage2D: function(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type,p_data) {
	}
	,TexSubImage2D: function(p_target,p_level,p_x,p_y,p_width,p_height,p_format,p_channel_type,p_data) {
	}
	,TexStorage2D: function(p_target,p_num_mipmaps,p_channels,p_width,p_height) {
	}
	,TexParameterf: function(p_target,p_parameter,p_value) {
	}
	,TexParameteri: function(p_target,p_parameter,p_value) {
	}
	,BlendFunc: function(p_src,p_dst) {
	}
	,Disable: function(p_flag) {
	}
	,Enable: function(p_flag) {
	}
	,DepthMask: function(p_flag) {
	}
	,DepthFunc: function(p_flag) {
	}
	,CullFace: function(p_face) {
	}
	,FrontFace: function(p_face) {
	}
	,Clear: function(p_flag) {
	}
	,ClearDepth: function(p_value) {
	}
	,ClearColor: function(p_r,p_g,p_b,p_a) {
	}
	,Viewport: function(p_x,p_y,p_width,p_height) {
	}
	,Scissor: function(p_x,p_y,p_width,p_height) {
	}
	,ReadPixels: function(p_x,p_y,p_width,p_height,p_format,p_type,p_pixels) {
	}
	,GetErrorCode: function() {
		return 0;
	}
	,GetErrorString: function(p_code) {
		switch(p_code) {
		case 0:
			return "";
		case 1280:
			return "Invalid Enum.";
		case 1281:
			return "Numeric argument is out of range.";
		case 1282:
			return "Operation not allowed in the current state.";
		case 1286:
			return "Write or Read in FrameBuffer not complete.";
		case 1285:
			return "Out of Memory.";
		}
		return "Unknown Error.";
	}
	,GetError: function() {
		return this.GetErrorString(this.GetErrorCode());
	}
	,Assert: function(p_log) {
		var err = this.GetErrorCode();
		if(err != 0) throw "GraphicContext> " + this.GetErrorString(err) + " - " + p_log;
	}
	,LogError: function() {
		haxor.core.Console.Log(this.GetError());
	}
	,__class__: haxor.graphics.GraphicContext
};
haxor.math.AABB2 = function(p_x,p_y,p_width,p_height) {
	if(p_height == null) p_height = 0;
	if(p_width == null) p_width = 0;
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.SetXYWH(p_x,p_y,p_width,p_height);
};
$hxClasses["haxor.math.AABB2"] = haxor.math.AABB2;
haxor.math.AABB2.__name__ = ["haxor","math","AABB2"];
haxor.math.AABB2.get_temp = function() {
	return haxor.context.EngineContext.data.get_aabb2();
};
haxor.math.AABB2.FromMinMax = function(p_xmin,p_xmax,p_ymin,p_ymax) {
	var b = new haxor.math.AABB2();
	b.m_xMin = p_xmin;
	b.m_xMax = p_xmax;
	b.m_yMin = p_ymin;
	b.m_yMax = p_ymax;
	b.Validate();
	return b;
};
haxor.math.AABB2.get_empty = function() {
	return new haxor.math.AABB2();
};
haxor.math.AABB2.prototype = {
	get_clone: function() {
		return haxor.math.AABB2.FromMinMax(this.get_xMin(),this.get_xMax(),this.get_yMin(),this.get_yMax());
	}
	,get_min: function() {
		return new haxor.math.Vector2(this.m_xMin,this.m_yMin);
	}
	,set_min: function(v) {
		this.set_xMin(v.x);
		this.set_yMin(v.y);
		return v;
	}
	,get_max: function() {
		return new haxor.math.Vector2(this.m_xMax,this.m_yMax);
	}
	,set_max: function(v) {
		this.set_xMax(v.x);
		this.set_yMax(v.y);
		return v;
	}
	,get_xMin: function() {
		return this.m_xMin;
	}
	,set_xMin: function(v) {
		this.m_xMin = v;
		this.Validate();
		return v;
	}
	,get_yMin: function() {
		return this.m_yMin;
	}
	,set_yMin: function(v) {
		this.m_yMin = v;
		this.Validate();
		return v;
	}
	,get_xMax: function() {
		return this.m_xMax;
	}
	,set_xMax: function(v) {
		this.m_xMax = v;
		this.Validate();
		return v;
	}
	,get_yMax: function() {
		return this.m_yMax;
	}
	,set_yMax: function(v) {
		this.m_yMax = v;
		this.Validate();
		return v;
	}
	,get_center: function() {
		return new haxor.math.Vector2(this.get_xMin() + (this.get_xMax() - this.get_xMin()) * 0.5,this.get_yMin() + (this.get_yMax() - this.get_yMin()) * 0.5);
	}
	,set_center: function(v) {
		var hw = haxor.math.Mathf.Abs(this.get_xMax() - this.get_xMin()) * 0.5;
		var hh = haxor.math.Mathf.Abs(this.get_yMax() - this.get_yMin()) * 0.5;
		this.m_xMin = v.x - hw;
		this.m_xMax = v.x + hw;
		this.m_yMin = v.y - hh;
		this.m_yMax = v.y + hh;
		return v;
	}
	,get_x: function() {
		return this.get_xMin();
	}
	,set_x: function(v) {
		this.set_xMin(v);
		return v;
	}
	,get_y: function() {
		return this.get_yMin();
	}
	,set_y: function(v) {
		this.set_yMin(v);
		return v;
	}
	,get_width: function() {
		return haxor.math.Mathf.Abs(this.get_xMax() - this.get_xMin());
	}
	,set_width: function(v) {
		this.set_xMax(this.get_xMin() + v);
		return v;
	}
	,get_height: function() {
		return haxor.math.Mathf.Abs(this.get_yMax() - this.get_yMin());
	}
	,set_height: function(v) {
		this.set_yMax(this.get_yMin() + v);
		return v;
	}
	,get_size: function() {
		return new haxor.math.Vector2(haxor.math.Mathf.Abs(this.get_xMax() - this.get_xMin()),haxor.math.Mathf.Abs(this.get_yMax() - this.get_yMin()));
	}
	,set_size: function(v) {
		this.set_width(v.x);
		this.set_height(v.y);
		return v;
	}
	,Validate: function() {
	}
	,Add: function(p_v) {
		this.m_xMax = Math.max(p_v.m_xMax,this.m_xMax);
		this.m_xMin = Math.min(p_v.m_xMin,this.m_xMin);
		this.m_yMax = Math.max(p_v.m_yMax,this.m_yMax);
		this.m_yMin = Math.min(p_v.m_yMin,this.m_yMin);
		return this;
	}
	,Set: function(p_xmin,p_xmax,p_ymin,p_ymax) {
		this.m_xMin = p_xmin;
		this.m_yMin = p_ymin;
		this.m_xMax = p_xmax;
		this.m_yMax = p_ymax;
		this.Validate();
		return this;
	}
	,SetXYWH: function(p_x,p_y,p_width,p_height) {
		this.m_xMin = p_x;
		this.m_yMin = p_y;
		this.m_xMax = this.m_xMin + p_width;
		this.m_yMax = this.m_yMin + p_height;
		return this;
	}
	,SetAABB2: function(p_v) {
		this.m_xMin = p_v.m_xMin;
		this.m_yMin = p_v.m_yMin;
		this.m_xMax = p_v.m_xMax;
		this.m_yMax = p_v.m_yMax;
		return this;
	}
	,Encapsulate: function(p_point) {
		this.set_xMin(haxor.math.Mathf.Min(p_point.x,this.get_xMin()));
		this.set_xMax(haxor.math.Mathf.Max(p_point.x,this.get_xMax()));
		this.set_yMin(haxor.math.Mathf.Min(p_point.y,this.get_yMin()));
		this.set_yMax(haxor.math.Mathf.Max(p_point.y,this.get_yMax()));
	}
	,Encapsulate3: function(p_x,p_y) {
		if(p_y == null) p_y = 0;
		if(p_x == null) p_x = 0;
		this.m_xMin = Math.min(p_x,this.m_xMin);
		this.m_xMax = Math.max(p_x,this.m_xMax);
		this.m_yMin = Math.min(p_y,this.m_yMin);
		this.m_yMax = Math.max(p_y,this.m_yMax);
		this.Validate();
		return this;
	}
	,ToString: function(p_places) {
		if(p_places == null) p_places = 2;
		var s0 = haxor.math.Mathf.RoundPlaces(this.m_xMin,p_places) + "";
		var s1 = haxor.math.Mathf.RoundPlaces(this.m_xMax,p_places) + "";
		var s2 = haxor.math.Mathf.RoundPlaces(this.m_yMin,p_places) + "";
		var s3 = haxor.math.Mathf.RoundPlaces(this.m_yMax,p_places) + "";
		return "[" + s0 + "," + s1 + "|" + s2 + "," + s3 + "]";
	}
	,__class__: haxor.math.AABB2
};
haxor.graphics.Graphics = function() { };
$hxClasses["haxor.graphics.Graphics"] = haxor.graphics.Graphics;
haxor.graphics.Graphics.__name__ = ["haxor","graphics","Graphics"];
haxor.graphics.Graphics.Viewport = function(p_viewport) {
	var vp = p_viewport;
	var dirty = false;
	if(haxor.math.Mathf.Abs(vp.get_xMin() - haxor.graphics.Graphics.m_last_viewport.get_xMin()) > 0.0) dirty = true; else if(haxor.math.Mathf.Abs(vp.get_yMin() - haxor.graphics.Graphics.m_last_viewport.get_yMin()) > 0.0) dirty = true; else if(haxor.math.Mathf.Abs(haxor.math.Mathf.Abs(vp.get_xMax() - vp.get_xMin()) - haxor.graphics.Graphics.m_last_viewport.get_width()) > 0.0) dirty = true; else if(haxor.math.Mathf.Abs(haxor.math.Mathf.Abs(vp.get_yMax() - vp.get_yMin()) - haxor.graphics.Graphics.m_last_viewport.get_height()) > 0.0) dirty = true;
	if(dirty) {
		haxor.graphics.Graphics.m_last_viewport.SetAABB2(vp);
		haxor.graphics.GL.Viewport(vp.get_xMin(),vp.get_yMin(),haxor.math.Mathf.Abs(vp.get_xMax() - vp.get_xMin()),haxor.math.Mathf.Abs(vp.get_yMax() - vp.get_yMin()));
		haxor.graphics.GL.Scissor(vp.get_xMin(),vp.get_yMin(),haxor.math.Mathf.Abs(vp.get_xMax() - vp.get_xMin()),haxor.math.Mathf.Abs(vp.get_yMax() - vp.get_yMin()));
	}
};
haxor.graphics.Graphics.Clear = function(p_camera) {
	var c = p_camera;
	haxor.graphics.Graphics.Viewport(p_camera.m_pixelViewport);
	if(c.clear != haxor.core.ClearFlag.None) {
		var flag = 0;
		if((c.clear & haxor.core.ClearFlag.Color) != 0) flag |= 16384;
		if((c.clear & haxor.core.ClearFlag.Skybox) != 0) flag |= 16384;
		if((c.clear & haxor.core.ClearFlag.Depth) != 0) flag |= 256;
		haxor.graphics.GL.m_gl.ClearColor(c.background.r,c.background.g,c.background.b,c.background.a);
		haxor.graphics.GL.m_gl.ClearDepth(1.0);
		haxor.graphics.GL.m_gl.Clear(flag);
	}
};
haxor.graphics.Graphics.Render = function(p_mesh,p_material,p_transform,p_camera) {
	haxor.context.EngineContext.material.Bind(p_material,p_transform,p_camera);
	haxor.context.EngineContext.mesh.Bind(p_mesh);
	haxor.context.EngineContext.mesh.Draw(p_mesh);
};
haxor.graphics.Graphics.DrawTexture = function(p_texture,p_x,p_y,p_width,p_height,p_color) {
	if(p_height == null) p_height = 256;
	if(p_width == null) p_width = 256;
	if(p_y == null) p_y = 0.0;
	if(p_x == null) p_x = 0.0;
	if(p_texture == null) return;
	var mat = haxor.context.EngineContext.gizmo.texture_material;
	mat.SetFloat2("Screen",haxor.graphics.Screen.m_width,haxor.graphics.Screen.m_height);
	mat.SetFloat4("Rect",p_x,p_y,p_width,p_height);
	mat.SetTexture("Texture",p_texture);
	var c;
	if(p_color == null) c = haxor.context.EngineContext.data.get_c().Set(1,1,1,1); else c = p_color;
	mat.SetFloat4("Tint",c.r,c.g,c.b,c.a);
	haxor.graphics.Graphics.Render(haxor.context.EngineContext.gizmo.texture,mat);
};
haxor.graphics.Screen = function() { };
$hxClasses["haxor.graphics.Screen"] = haxor.graphics.Screen;
haxor.graphics.Screen.__name__ = ["haxor","graphics","Screen"];
haxor.graphics.Screen.get_width = function() {
	return haxor.graphics.Screen.m_width;
};
haxor.graphics.Screen.get_height = function() {
	return haxor.graphics.Screen.m_height;
};
haxor.graphics.Screen.get_fullscreen = function() {
	return haxor.graphics.Screen.m_fullscreen;
};
haxor.graphics.Screen.set_fullscreen = function(v) {
	haxor.graphics.Screen.m_fullscreen = haxor.graphics.Screen.m_application.OnFullscreenRequest(v);
	return haxor.graphics.Screen.m_fullscreen;
};
haxor.graphics.Screen.get_cursor = function() {
	return haxor.graphics.Screen.m_cursor;
};
haxor.graphics.Screen.set_cursor = function(v) {
	if(v == haxor.graphics.CursorMode.Lock) {
		var is_locked = haxor.graphics.Screen.m_application.OnPointerLockRequest(true);
		if(!is_locked) return haxor.graphics.Screen.m_cursor = haxor.graphics.CursorMode.Show;
		haxor.graphics.Screen.m_application.OnPointerVisibilityRequest(false);
		return haxor.graphics.Screen.m_cursor = haxor.graphics.CursorMode.Lock;
	}
	haxor.graphics.Screen.m_application.OnPointerLockRequest(false);
	var is_visible = haxor.graphics.Screen.m_application.OnPointerVisibilityRequest(v == haxor.graphics.CursorMode.Show);
	return is_visible?haxor.graphics.Screen.m_cursor = haxor.graphics.CursorMode.Show:haxor.graphics.Screen.m_cursor = haxor.graphics.CursorMode.Hide;
};
haxor.graphics.Screen.Initialize = function(p_application) {
	haxor.graphics.Screen.m_application = p_application;
	haxor.graphics.Screen.m_width = 0;
	haxor.graphics.Screen.m_height = 0;
	haxor.graphics.Screen.m_fullscreen = false;
	haxor.graphics.Screen.m_cursor = haxor.graphics.CursorMode.Show;
	haxor.graphics.Screen.m_application = null;
};
haxor.graphics.CursorMode = { __ename__ : true, __constructs__ : ["Show","Hide","Lock"] };
haxor.graphics.CursorMode.Show = ["Show",0];
haxor.graphics.CursorMode.Show.__enum__ = haxor.graphics.CursorMode;
haxor.graphics.CursorMode.Hide = ["Hide",1];
haxor.graphics.CursorMode.Hide.__enum__ = haxor.graphics.CursorMode;
haxor.graphics.CursorMode.Lock = ["Lock",2];
haxor.graphics.CursorMode.Lock.__enum__ = haxor.graphics.CursorMode;
haxor.graphics.material = {};
haxor.graphics.material.Material = function(p_name) {
	if(p_name == null) p_name = "";
	this.grab = false;
	haxor.core.Resource.call(this,p_name);
	this.__cid = haxor.context.EngineContext.material.mid.get_id();
	this.m_uniforms = [];
	this.queue = 1000;
	this.zfunc = 515;
	this.ztest = true;
	this.zwrite = true;
	this.blend = false;
	this.blendSrc = 1;
	this.blendDst = 0;
	this.invert = false;
	this.cull = 2;
	this.lighting = false;
	this.grab = false;
	haxor.context.EngineContext.material.InitializeMaterial(this);
};
$hxClasses["haxor.graphics.material.Material"] = haxor.graphics.material.Material;
haxor.graphics.material.Material.__name__ = ["haxor","graphics","material","Material"];
haxor.graphics.material.Material.Opaque = function(p_texture,p_ztest,p_zwrite) {
	if(p_zwrite == null) p_zwrite = true;
	if(p_ztest == null) p_ztest = true;
	var m = new haxor.graphics.material.Material("Opaque");
	m.set_shader(p_texture == null?haxor.graphics.material.Shader.m_flat_shader == null?haxor.graphics.material.Shader.m_flat_shader = new haxor.graphics.material.Shader(haxor.context.ShaderContext.flat_source):haxor.graphics.material.Shader.m_flat_shader:haxor.graphics.material.Shader.m_flat_texture_shader == null?haxor.graphics.material.Shader.m_flat_texture_shader = new haxor.graphics.material.Shader(haxor.context.ShaderContext.flat_texture_source):haxor.graphics.material.Shader.m_flat_texture_shader);
	m.queue = 1000;
	m.ztest = p_ztest;
	m.zwrite = p_zwrite;
	if(p_texture != null) m.SetTexture("DiffuseTexture",p_texture);
	return m;
};
haxor.graphics.material.Material.Transparent = function(p_texture,p_ztest,p_zwrite,p_double_sided) {
	if(p_double_sided == null) p_double_sided = false;
	if(p_zwrite == null) p_zwrite = true;
	if(p_ztest == null) p_ztest = true;
	var m = new haxor.graphics.material.Material("Transparent");
	if(p_double_sided) m.cull = 0;
	m.SetBlending(770,771);
	m.set_shader(p_texture == null?haxor.graphics.material.Shader.m_flat_shader == null?haxor.graphics.material.Shader.m_flat_shader = new haxor.graphics.material.Shader(haxor.context.ShaderContext.flat_source):haxor.graphics.material.Shader.m_flat_shader:haxor.graphics.material.Shader.m_flat_texture_shader == null?haxor.graphics.material.Shader.m_flat_texture_shader = new haxor.graphics.material.Shader(haxor.context.ShaderContext.flat_texture_source):haxor.graphics.material.Shader.m_flat_texture_shader);
	m.queue = 2000;
	m.ztest = p_ztest;
	m.zwrite = p_zwrite;
	m.blend = true;
	if(p_texture != null) m.SetTexture("DiffuseTexture",p_texture);
	return m;
};
haxor.graphics.material.Material.AdditiveAlpha = function(p_texture,p_ztest,p_zwrite,p_double_sided) {
	if(p_double_sided == null) p_double_sided = false;
	if(p_zwrite == null) p_zwrite = true;
	if(p_ztest == null) p_ztest = true;
	var m = haxor.graphics.material.Material.Transparent(null,p_ztest,p_zwrite,p_double_sided);
	m.set_name("AdditiveAlpha");
	m.SetBlending(770,1);
	return m;
};
haxor.graphics.material.Material.Additive = function(p_texture,p_ztest,p_zwrite,p_double_sided) {
	if(p_double_sided == null) p_double_sided = false;
	if(p_zwrite == null) p_zwrite = true;
	if(p_ztest == null) p_ztest = true;
	var m = haxor.graphics.material.Material.Transparent(null,p_ztest,p_zwrite,p_double_sided);
	m.set_name("Additive");
	m.SetBlending(1,1);
	return m;
};
haxor.graphics.material.Material.__super__ = haxor.core.Resource;
haxor.graphics.material.Material.prototype = $extend(haxor.core.Resource.prototype,{
	get_shader: function() {
		return this.m_shader;
	}
	,set_shader: function(v) {
		if(this.m_shader == v) return v;
		haxor.context.EngineContext.material.UpdateShader(this,this.m_shader,v);
		this.m_shader = v;
		return v;
	}
	,SetBlending: function(p_src,p_dst) {
		this.blendSrc = p_src;
		this.blendDst = p_dst;
	}
	,SetTexture: function(p_name,p_texture) {
		if(p_texture == null) {
			this.RemoveUniform(p_name);
			return;
		}
		var u = this.FetchUniform(p_name,false,1,1,true);
		if(u.exists) u.SetTexture(p_texture);
	}
	,SetMatrix4: function(p_name,p_matrix4,p_transpose) {
		if(p_transpose == null) p_transpose = false;
		if(p_matrix4 == null) {
			this.RemoveUniform(p_name);
			return;
		}
		var u = this.FetchUniform(p_name,true,16,16,true);
		if(u.exists) u.SetMatrix4(p_matrix4,p_transpose);
	}
	,SetVector2: function(p_name,p_v) {
		this.SetFloat2(p_name,p_v.x,p_v.y);
	}
	,SetVector3: function(p_name,p_v) {
		this.SetFloat3(p_name,p_v.x,p_v.y,p_v.z);
	}
	,SetVector4: function(p_name,p_v) {
		this.SetFloat4(p_name,p_v.x,p_v.y,p_v.z,p_v.w);
	}
	,SetColor: function(p_name,p_color) {
		this.SetFloat4(p_name,p_color.r,p_color.g,p_color.b,p_color.a);
	}
	,SetFloat: function(p_name,p_v) {
		var u = this.FetchUniform(p_name,true,1,1,true);
		if(u.exists) u.SetFloat(p_v);
	}
	,SetFloat2: function(p_name,p_x,p_y) {
		var u = this.FetchUniform(p_name,true,2,2,true);
		if(u.exists) u.SetFloat2(p_x,p_y);
	}
	,SetFloat3: function(p_name,p_x,p_y,p_z) {
		var u = this.FetchUniform(p_name,true,3,3,true);
		if(u.exists) u.SetFloat3(p_x,p_y,p_z);
	}
	,SetFloat4: function(p_name,p_x,p_y,p_z,p_w) {
		var u = this.FetchUniform(p_name,true,4,4,true);
		if(u.exists) u.SetFloat4(p_x,p_y,p_z,p_w);
	}
	,SetFloatArray: function(p_name,p_list) {
		var u = this.FetchUniform(p_name,true,p_list.length,1,true);
		if(u.exists) u.SetFloatArray(p_list);
	}
	,SetFloat2Array: function(p_name,p_list) {
		var u = this.FetchUniform(p_name,true,p_list.length,2,true);
		if(u.exists) u.SetFloat2Array(p_list);
	}
	,SetFloat3Array: function(p_name,p_list) {
		var u = this.FetchUniform(p_name,true,p_list.length,3,true);
		if(u.exists) u.SetFloat3Array(p_list);
	}
	,SetFloat4Array: function(p_name,p_list) {
		var u = this.FetchUniform(p_name,true,p_list.length,4,true);
		if(u.exists) u.SetFloat4Array(p_list);
	}
	,SetInt: function(p_name,p_v) {
		var u = this.FetchUniform(p_name,false,1,1,true);
		if(u.exists) u.SetInt(p_v);
	}
	,SetInt2: function(p_name,p_x,p_y) {
		var u = this.FetchUniform(p_name,false,2,2,true);
		if(u.exists) u.SetInt2(p_x,p_y);
	}
	,SetInt3: function(p_name,p_x,p_y,p_z) {
		var u = this.FetchUniform(p_name,false,3,3,true);
		if(u.exists) u.SetInt3(p_x,p_y,p_z);
	}
	,SetInt4: function(p_name,p_x,p_y,p_z,p_w) {
		var u = this.FetchUniform(p_name,false,4,4,true);
		if(u.exists) u.SetInt4(p_x,p_y,p_z,p_w);
	}
	,SetIntArray: function(p_name,p_list) {
		var u = this.FetchUniform(p_name,false,p_list.length,1,true);
		if(u.exists) u.SetIntArray(p_list);
	}
	,SetInt2Array: function(p_name,p_list) {
		var u = this.FetchUniform(p_name,false,p_list.length,2,true);
		if(u.exists) u.SetInt2Array(p_list);
	}
	,SetInt3Array: function(p_name,p_list) {
		var u = this.FetchUniform(p_name,false,p_list.length,3,true);
		if(u.exists) u.SetInt3Array(p_list);
	}
	,SetInt4Array: function(p_name,p_list) {
		var u = this.FetchUniform(p_name,false,p_list.length,4,true);
		if(u.exists) u.SetInt4Array(p_list);
	}
	,GetUniform: function(p_name) {
		var _g1 = 0;
		var _g = this.m_uniforms.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.m_uniforms[i].name == p_name) return this.m_uniforms[i];
		}
		return null;
	}
	,HasUniform: function(p_name,p_check_shader) {
		if(p_check_shader == null) p_check_shader = false;
		var _g1 = 0;
		var _g = this.m_uniforms.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.m_uniforms[i].name == p_name) {
				if(p_check_shader) return this.m_uniforms[i].exists;
				return true;
			}
		}
		return false;
	}
	,RemoveUniform: function(p_name) {
		var u = null;
		var _g1 = 0;
		var _g = this.m_uniforms.length;
		while(_g1 < _g) {
			var i = _g1++;
			u = this.m_uniforms[i];
			if(u.name == p_name) break;
		}
		if(u != null) {
			haxor.context.EngineContext.material.DestroyUniform(this,u);
			HxOverrides.remove(this.m_uniforms,u);
		}
	}
	,FetchUniform: function(p_name,p_is_float,p_length,p_offset,p_create) {
		var u = null;
		var _g1 = 0;
		var _g = this.m_uniforms.length;
		while(_g1 < _g) {
			var i = _g1++;
			u = this.m_uniforms[i];
			if(u.name == p_name) {
				if(u.isFloat == p_is_float) {
					if(u.offset == p_offset) {
						if(u.data.m_length == p_length) return u;
					}
				}
				haxor.context.EngineContext.material.DestroyUniform(this,u);
				HxOverrides.remove(this.m_uniforms,u);
				break;
			}
		}
		if(p_create) {
			u = new haxor.graphics.material.MaterialUniform(p_name,p_is_float,p_length,p_offset);
			haxor.context.EngineContext.material.CreateUniform(this,u);
			this.m_uniforms.push(u);
		}
		return u;
	}
	,OnDestroy: function() {
		haxor.context.EngineContext.material.DestroyMaterial(this);
	}
	,__class__: haxor.graphics.material.Material
});
haxor.graphics.material.MaterialUniform = function(p_name,p_is_float,p_length,p_offset) {
	this.__cid = haxor.context.EngineContext.material.uid.get_id();
	this.__d = true;
	this.name = p_name;
	this.isFloat = p_is_float;
	this.offset = p_offset;
	this.exists = false;
	if(p_is_float) this.data = new haxor.io.FloatArray(p_length); else this.data = new haxor.io.Int32Array(p_length);
};
$hxClasses["haxor.graphics.material.MaterialUniform"] = haxor.graphics.material.MaterialUniform;
haxor.graphics.material.MaterialUniform.__name__ = ["haxor","graphics","material","MaterialUniform"];
haxor.graphics.material.MaterialUniform.prototype = {
	SetFloat: function(p_v) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		b.Set(0,p_v);
	}
	,SetFloat2: function(p_x,p_y) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		b.Set(0,p_x);
		b.Set(1,p_y);
	}
	,SetFloat3: function(p_x,p_y,p_z) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		b.Set(0,p_x);
		b.Set(1,p_y);
		b.Set(2,p_z);
	}
	,SetFloat4: function(p_x,p_y,p_z,p_w) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		b.Set(0,p_x);
		b.Set(1,p_y);
		b.Set(2,p_z);
		b.Set(3,p_w);
	}
	,SetFloatArray: function(p_list) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		var _g1 = 0;
		var _g = p_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			b.Set(i,p_list[i]);
		}
	}
	,SetFloat2Array: function(p_list) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		var _g1 = 0;
		var _g = p_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			b.Set(i,p_list[i]);
		}
	}
	,SetFloat3Array: function(p_list) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		var _g1 = 0;
		var _g = p_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			b.Set(i,p_list[i]);
		}
	}
	,SetFloat4Array: function(p_list) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		var _g1 = 0;
		var _g = p_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			b.Set(i,p_list[i]);
		}
	}
	,SetInt: function(p_v) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		b.Set(0,p_v);
	}
	,SetInt2: function(p_x,p_y) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		b.Set(0,p_x);
		b.Set(1,p_y);
	}
	,SetInt3: function(p_x,p_y,p_z) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		b.Set(0,p_x);
		b.Set(1,p_y);
		b.Set(2,p_z);
	}
	,SetInt4: function(p_x,p_y,p_z,p_w) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		b.Set(0,p_x);
		b.Set(1,p_y);
		b.Set(2,p_z);
		b.Set(3,p_w);
	}
	,SetIntArray: function(p_list) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		var _g1 = 0;
		var _g = p_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			b.Set(i,p_list[i]);
		}
	}
	,SetInt2Array: function(p_list) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		var _g1 = 0;
		var _g = p_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			b.Set(i,p_list[i]);
		}
	}
	,SetInt3Array: function(p_list) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		var _g1 = 0;
		var _g = p_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			b.Set(i,p_list[i]);
		}
	}
	,SetInt4Array: function(p_list) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		var _g1 = 0;
		var _g = p_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			b.Set(i,p_list[i]);
		}
	}
	,SetTexture: function(p_texture) {
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		b.Set(0,p_texture.__slot);
		this.texture = p_texture;
	}
	,SetMatrix4: function(m,t) {
		if(t == null) t = false;
		if(!this.exists) return;
		this.__d = true;
		var b = this.data;
		if(!t) {
			b.Set(0,m.m00);
			b.Set(1,m.m01);
			b.Set(2,m.m02);
			b.Set(3,m.m03);
			b.Set(4,m.m10);
			b.Set(5,m.m11);
			b.Set(6,m.m12);
			b.Set(7,m.m13);
			b.Set(8,m.m20);
			b.Set(9,m.m21);
			b.Set(10,m.m22);
			b.Set(11,m.m23);
			b.Set(12,m.m30);
			b.Set(13,m.m31);
			b.Set(14,m.m32);
			b.Set(15,m.m33);
		} else {
			b.Set(0,m.m00);
			b.Set(1,m.m10);
			b.Set(2,m.m20);
			b.Set(3,m.m30);
			b.Set(4,m.m01);
			b.Set(5,m.m11);
			b.Set(6,m.m21);
			b.Set(7,m.m31);
			b.Set(8,m.m02);
			b.Set(9,m.m12);
			b.Set(10,m.m22);
			b.Set(11,m.m32);
			b.Set(12,m.m03);
			b.Set(13,m.m13);
			b.Set(14,m.m23);
			b.Set(15,m.m33);
		}
	}
	,SetVector2: function(p_v) {
		this.SetFloat2(p_v.x,p_v.y);
	}
	,SetVector3: function(p_v) {
		this.SetFloat3(p_v.x,p_v.y,p_v.z);
	}
	,SetVector4: function(p_v) {
		this.SetFloat4(p_v.x,p_v.y,p_v.z,p_v.w);
	}
	,SetColor: function(p_color) {
		this.SetFloat4(p_color.r,p_color.g,p_color.b,p_color.a);
	}
	,__class__: haxor.graphics.material.MaterialUniform
};
haxor.graphics.material.Shader = function(p_source) {
	haxor.core.Resource.call(this);
	this.__cid = haxor.context.EngineContext.material.sid.get_id();
	var vt0 = p_source.indexOf("<vertex");
	var vt1 = p_source.indexOf(">",vt0 + 1);
	var vt = p_source.substring(vt0,vt1 + 1);
	var ft0 = p_source.indexOf("<fragment");
	var ft1 = p_source.indexOf(">",ft0 + 1);
	var ft = p_source.substring(ft0,ft1 + 1);
	p_source = StringTools.replace(p_source,vt,vt + "<![CDATA[");
	p_source = StringTools.replace(p_source,"</vertex>","]]></vertex>");
	p_source = StringTools.replace(p_source,ft,ft + "<![CDATA[");
	p_source = StringTools.replace(p_source,"</fragment>","]]></fragment>");
	var x;
	x = Xml.parse(p_source);
	x = x.firstElement();
	this.set_name(x.get("id"));
	if(this.get_name() == null || this.get_name() == "") this.set_name("Shader" + this.__cid);
	var vs = x.elementsNamed("vertex").next();
	var fs = x.elementsNamed("fragment").next();
	this.m_vss = this.GetShaderSource(vs);
	this.m_fss = this.GetShaderSource(fs);
	this.m_hasError = false;
	haxor.context.EngineContext.material.InitializeShader(this);
};
$hxClasses["haxor.graphics.material.Shader"] = haxor.graphics.material.Shader;
haxor.graphics.material.Shader.__name__ = ["haxor","graphics","material","Shader"];
haxor.graphics.material.Shader.get_Flat = function() {
	if(haxor.graphics.material.Shader.m_flat_shader == null) return haxor.graphics.material.Shader.m_flat_shader = new haxor.graphics.material.Shader(haxor.context.ShaderContext.flat_source); else return haxor.graphics.material.Shader.m_flat_shader;
};
haxor.graphics.material.Shader.get_FlatTexture = function() {
	if(haxor.graphics.material.Shader.m_flat_texture_shader == null) return haxor.graphics.material.Shader.m_flat_texture_shader = new haxor.graphics.material.Shader(haxor.context.ShaderContext.flat_texture_source); else return haxor.graphics.material.Shader.m_flat_texture_shader;
};
haxor.graphics.material.Shader.get_FlatTextureSkin = function() {
	if(haxor.graphics.material.Shader.m_flat_texture_skin_shader == null) return haxor.graphics.material.Shader.m_flat_texture_skin_shader = new haxor.graphics.material.Shader(haxor.context.ShaderContext.flat_texture_skin_source); else return haxor.graphics.material.Shader.m_flat_texture_skin_shader;
};
haxor.graphics.material.Shader.__super__ = haxor.core.Resource;
haxor.graphics.material.Shader.prototype = $extend(haxor.core.Resource.prototype,{
	get_hasError: function() {
		return this.m_hasError;
	}
	,GetShaderSource: function(n) {
		if(n == null) return "";
		var src = n.firstChild().get_nodeValue().toString();
		var prec = (n.get("precision") == null?"low":n.get("precision")).toLowerCase();
		switch(prec) {
		case "low":
			prec = "precision lowp float;";
			break;
		case "medium":
			prec = "precision mediump float;";
			break;
		case "high":
			prec = "precision highp float;";
			break;
		}
		return prec + src;
	}
	,OnDestroy: function() {
		haxor.context.EngineContext.material.DestroyShader(this);
	}
	,__class__: haxor.graphics.material.Shader
});
haxor.graphics.material.UberShader = function(p_source) {
	haxor.graphics.material.Shader.call(this,p_source);
};
$hxClasses["haxor.graphics.material.UberShader"] = haxor.graphics.material.UberShader;
haxor.graphics.material.UberShader.__name__ = ["haxor","graphics","material","UberShader"];
haxor.graphics.material.UberShader.__super__ = haxor.graphics.material.Shader;
haxor.graphics.material.UberShader.prototype = $extend(haxor.graphics.material.Shader.prototype,{
	__class__: haxor.graphics.material.UberShader
});
haxor.graphics.mesh = {};
haxor.graphics.mesh.Mesh = function(p_name) {
	if(p_name == null) p_name = "";
	haxor.core.Resource.call(this,p_name);
	this.__cid = haxor.context.EngineContext.mesh.mid.get_id();
	this.m_attribs = [];
	this.m_indexed = false;
	this.m_vcount = 0;
	this.m_bounds = haxor.math.AABB3.get_empty();
	this.m_mode = 35044;
	this.primitive = 4;
	this.m_topology_attrib = new haxor.graphics.mesh.MeshAttrib();
	this.m_topology_attrib.m_name = "$topology";
	this.m_topology_attrib.offset = 1;
};
$hxClasses["haxor.graphics.mesh.Mesh"] = haxor.graphics.mesh.Mesh;
haxor.graphics.mesh.Mesh.__name__ = ["haxor","graphics","mesh","Mesh"];
haxor.graphics.mesh.Mesh.__super__ = haxor.core.Resource;
haxor.graphics.mesh.Mesh.prototype = $extend(haxor.core.Resource.prototype,{
	get_topology: function() {
		if(this.m_topology_attrib.data == null) return new haxor.io.UInt16Array(0);
		return this.m_topology_attrib.data;
	}
	,set_topology: function(v) {
		if(v == null) {
			this.m_topology_attrib.data = null;
			this.m_indexed = false;
			haxor.context.EngineContext.mesh.RemoveAttrib(this.m_topology_attrib);
		} else {
			this.m_topology_attrib.data = v;
			this.m_indexed = true;
			haxor.context.EngineContext.mesh.UpdateAttrib(this.m_topology_attrib,this.m_mode,true);
		}
		return v;
	}
	,get_indexed: function() {
		return this.m_indexed;
	}
	,get_mode: function() {
		return this.m_mode;
	}
	,set_mode: function(v) {
		if(this.m_mode == v) return v;
		this.m_mode = v;
		if(this.m_indexed) haxor.context.EngineContext.mesh.UpdateAttrib(this.m_topology_attrib,this.m_mode,true);
		var _g1 = 0;
		var _g = this.m_attribs.length;
		while(_g1 < _g) {
			var i = _g1++;
			haxor.context.EngineContext.mesh.UpdateAttrib(this.m_attribs[i],this.m_mode,false);
		}
		return v;
	}
	,get_attribs: function() {
		var l = [];
		var _g1 = 0;
		var _g = this.m_attribs.length;
		while(_g1 < _g) {
			var i = _g1++;
			l.push(this.m_attribs[i].m_name);
		}
		return l;
	}
	,get_vcount: function() {
		return this.m_vcount;
	}
	,get_bounds: function() {
		return this.m_bounds;
	}
	,set_bounds: function(v) {
		return this.m_bounds.SetAABB3(v);
	}
	,Clear: function(p_from_gpu) {
		if(p_from_gpu == null) p_from_gpu = true;
		var _g1 = 0;
		var _g = this.m_attribs.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_attribs[i].data = null;
			this.m_attribs[i].m_name = "";
			if(p_from_gpu) haxor.context.EngineContext.mesh.RemoveAttrib(this.m_attribs[i]);
		}
		this.m_vcount = 0;
		if(p_from_gpu) this.set_topology(null); else this.m_topology_attrib.data = null;
	}
	,Exists: function(p_name) {
		return this.GetAttribute(p_name) != null;
	}
	,Get: function(p_name) {
		var a = this.GetAttribute(p_name);
		if(a == null) return null; else return a.data;
	}
	,GetAttribute: function(p_name) {
		var _g1 = 0;
		var _g = this.m_attribs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.m_attribs[i].m_name == p_name) return this.m_attribs[i];
		}
		return null;
	}
	,Remove: function(p_name) {
		var a = this.GetAttribute(p_name);
		if(a == null) return;
		HxOverrides.remove(this.m_attribs,a);
		haxor.context.EngineContext.mesh.RemoveAttrib(a);
	}
	,Set: function(p_name,p_data,p_offset) {
		if(p_offset == null) p_offset = 0;
		if(p_data == null) {
			haxor.core.Console.Log("Mesh> [" + this.get_name() + "] tried to set null array.",1);
			return null;
		}
		var a = this.GetAttribute(p_name);
		if(a == null) {
			a = new haxor.graphics.mesh.MeshAttrib();
			a.m_name = p_name;
			this.m_attribs.push(a);
		}
		if(p_offset > 0) a.offset = p_offset;
		a.data = p_data;
		this.m_vcount = this.m_attribs[0].get_count();
		var _g1 = 1;
		var _g = this.m_attribs.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_attribs[i].get_count();
			if(this.m_vcount < c) this.m_vcount = this.m_vcount; else this.m_vcount = c;
		}
		haxor.context.EngineContext.mesh.UpdateAttrib(a,this.m_mode,false);
		return a;
	}
	,GenerateAttribBounds: function(p_attrib,p_result) {
		var b;
		if(p_result == null) b = haxor.math.AABB3.get_empty(); else b = p_result;
		var a = this.GetAttribute(p_attrib);
		if(a == null) return b.Set(0,0,0,0,0,0);
		var step = a.offset;
		if(step <= 0) return b.Set(0,0,0,0,0,0);
		var i = step;
		var f = a.data;
		var vx;
		if(step > 0) vx = f.Get(0); else vx = 0;
		var vy;
		if(step > 1) vy = f.Get(1); else vy = 0;
		var vz;
		if(step > 2) vz = f.Get(2); else vz = 0;
		b.Set(vx,vx,vy,vy,vz,vz);
		while(i < f.m_length) {
			if(step > 0) vx = f.Get(i); else vx = 0;
			if(step > 1) vy = f.Get(i + 1); else vy = 0;
			if(step > 2) vz = f.Get(i + 2); else vz = 0;
			b.Encapsulate3(vx,vy,vz);
			i += step;
		}
		return b;
	}
	,OnDestroy: function() {
		this.Clear();
		haxor.context.EngineContext.mesh.mid.set_id(this.__cid);
	}
	,__class__: haxor.graphics.mesh.Mesh
});
haxor.graphics.mesh.MeshAttrib = function() {
	this.__cid = haxor.context.EngineContext.mesh.aid.get_id();
	this._loc_ = -1;
	this.m_name = "";
	this.data = null;
	this.offset = 0;
};
$hxClasses["haxor.graphics.mesh.MeshAttrib"] = haxor.graphics.mesh.MeshAttrib;
haxor.graphics.mesh.MeshAttrib.__name__ = ["haxor","graphics","mesh","MeshAttrib"];
haxor.graphics.mesh.MeshAttrib.prototype = {
	get_name: function() {
		return this.m_name;
	}
	,get_count: function() {
		if(this.data == null) return 0; else return this.data.m_length / this.offset | 0;
	}
	,__class__: haxor.graphics.mesh.MeshAttrib
};
haxor.graphics.texture = {};
haxor.graphics.texture.Bitmap = function(p_width,p_height,p_format) {
	haxor.core.Resource.call(this);
	this.m_width = p_width;
	this.m_height = p_height;
	this.m_format = p_format;
	this.m_float = false;
	this.m_channels = 1;
	switch(p_format[1]) {
	case 1:
		this.m_channels = 1;
		break;
	case 0:
		this.m_channels = 1;
		break;
	case 2:
		this.m_channels = 3;
		break;
	case 3:
		this.m_channels = 4;
		break;
	case 10:
		this.m_channels = 1;
		this.m_float = true;
		break;
	case 7:
		this.m_channels = 1;
		this.m_float = true;
		break;
	case 4:
		this.m_channels = 1;
		this.m_float = true;
		break;
	case 8:
		this.m_channels = 3;
		this.m_float = true;
		break;
	case 5:
		this.m_channels = 3;
		this.m_float = true;
		break;
	case 9:
		this.m_channels = 4;
		this.m_float = true;
		break;
	case 6:
		this.m_channels = 4;
		this.m_float = true;
		break;
	}
	var len = this.m_width * this.m_height * this.m_channels;
	if(this.m_float) this.m_buffer = new haxor.io.FloatArray(len); else this.m_buffer = new haxor.io.Buffer(len);
};
$hxClasses["haxor.graphics.texture.Bitmap"] = haxor.graphics.texture.Bitmap;
haxor.graphics.texture.Bitmap.__name__ = ["haxor","graphics","texture","Bitmap"];
haxor.graphics.texture.Bitmap.__super__ = haxor.core.Resource;
haxor.graphics.texture.Bitmap.prototype = $extend(haxor.core.Resource.prototype,{
	get_buffer: function() {
		return this.m_buffer;
	}
	,get_float: function() {
		return this.m_float;
	}
	,get_width: function() {
		return this.m_width;
	}
	,get_height: function() {
		return this.m_height;
	}
	,get_channels: function() {
		return this.m_channels;
	}
	,get_format: function() {
		return this.m_format;
	}
	,GetPixel: function(p_x,p_y) {
		if(p_x < 0) return new haxor.math.Color();
		if(p_y < 0) return new haxor.math.Color();
		if(p_x >= this.m_width) return new haxor.math.Color();
		if(p_y >= this.m_height) return new haxor.math.Color();
		p_y = this.m_height - 1 - p_y;
		var cc = this.m_channels;
		var pos = (p_x + p_y * this.m_width) * cc;
		if(this.m_float) {
			var c = new haxor.math.Color();
			var b = this.m_buffer;
			switch(cc) {
			case 1:
				c.r = b.Get(pos);
				c.g = c.r;
				c.b = c.r;
				c.a = 1.0;
				break;
			case 2:
				c.r = b.Get(pos);
				c.g = b.Get(pos + 1);
				c.b = c.r;
				c.a = 1.0;
				break;
			case 3:
				c.r = b.Get(pos);
				c.g = b.Get(pos + 1);
				c.b = b.Get(pos + 2);
				c.a = 1.0;
				break;
			case 4:
				c.r = b.Get(pos);
				c.g = b.Get(pos + 1);
				c.b = b.Get(pos + 2);
				c.a = b.Get(pos + 3);
				break;
			}
			return c;
		}
		var b1 = this.m_buffer;
		var rb = b1.GetByte(pos);
		var gb;
		if(cc >= 2) gb = b1.GetByte(pos + 1); else gb = rb;
		var bb;
		if(cc >= 3) bb = b1.GetByte(pos + 2); else bb = rb;
		var ab;
		if(cc >= 4) ab = b1.GetByte(pos + 3); else ab = rb;
		return haxor.math.Color.FromBytes(rb,gb,bb,ab);
	}
	,SetPixel: function(p_x,p_y,p_color) {
		if(p_x < 0) return;
		if(p_y < 0) return;
		if(p_x >= this.m_width) return;
		if(p_y >= this.m_height) return;
		p_y = this.m_height - 1 - p_y;
		var cc = this.m_channels;
		var pos = (p_x + p_y * this.m_width) * cc;
		if(this.m_float) {
			var b = this.m_buffer;
			b.Set(pos,p_color.r);
			if(cc >= 2) b.Set(pos + 1,p_color.g);
			if(cc >= 3) b.Set(pos + 2,p_color.b);
			if(cc >= 4) b.Set(pos + 3,p_color.a);
			return;
		}
		var b1 = this.m_buffer;
		b1.SetByte(pos,p_color.r * 255.0);
		if(cc >= 2) b1.SetByte(pos + 1,p_color.g * 255.0);
		if(cc >= 3) b1.SetByte(pos + 2,p_color.b * 255.0);
		if(cc >= 4) b1.SetByte(pos + 3,p_color.a * 255.0);
	}
	,Fill: function(p_color) {
		var _g1 = 0;
		var _g = this.m_width;
		while(_g1 < _g) {
			var ix = _g1++;
			var _g3 = 0;
			var _g2 = this.m_height;
			while(_g3 < _g2) {
				var iy = _g3++;
				this.SetPixel(ix,iy,p_color);
			}
		}
	}
	,Set: function(p_x,p_y,p_v0,p_v1,p_v2,p_v3) {
		if(p_v3 == null) p_v3 = 0.0;
		if(p_v2 == null) p_v2 = 0.0;
		if(p_v1 == null) p_v1 = 0.0;
		if(p_v0 == null) p_v0 = 0.0;
		var cc = this.m_channels;
		p_y = this.m_height - 1 - p_y;
		var pos = (p_x + p_y * this.m_width) * cc;
		if(this.m_float) {
			var b = this.m_buffer;
			b.Set(pos,p_v0);
			if(cc >= 2) b.Set(pos + 1,p_v1);
			if(cc >= 3) b.Set(pos + 2,p_v2);
			if(cc >= 4) b.Set(pos + 3,p_v3);
			return;
		}
		var b1 = this.m_buffer;
		b1.SetByte(pos,p_v0 * 255.0);
		if(cc >= 2) b1.SetByte(pos + 1,p_v1 * 255.0);
		if(cc >= 3) b1.SetByte(pos + 2,p_v2 * 255.0);
		if(cc >= 4) b1.SetByte(pos + 3,p_v3 * 255.0);
	}
	,SetRange: function(p_x,p_y,p_width,p_height,p_values,p_length) {
		if(p_length == null) p_length = -1;
		p_y = this.m_height - 1 - p_y;
		var cc = this.m_channels;
		var len;
		if(p_length < 0) len = p_values.length; else len = p_length;
		var k = 0;
		var px = p_x;
		var py = p_y;
		var v0 = 0.0;
		var v1 = 0.0;
		var v2 = 0.0;
		var v3 = 0.0;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var pos = (px + py * this.m_width) * cc;
			px++;
			if(px >= p_width) {
				px = p_x;
				py++;
			}
			v0 = p_values[k++];
			if(cc >= 2) v1 = p_values[k++];
			if(cc >= 3) v2 = p_values[k++];
			if(cc >= 4) v3 = p_values[k++];
			if(this.m_float) {
				var b = this.m_buffer;
				b.Set(pos,v0);
				if(cc >= 2) b.Set(pos + 1,v1);
				if(cc >= 3) b.Set(pos + 2,v2);
				if(cc >= 4) b.Set(pos + 3,v3);
				continue;
			}
			var b1 = this.m_buffer;
			b1.SetByte(pos,v0 * 255.0);
			if(cc >= 2) b1.SetByte(pos + 1,v1 * 255.0);
			if(cc >= 3) b1.SetByte(pos + 2,v2 * 255.0);
			if(cc >= 4) b1.SetByte(pos + 3,v3 * 255.0);
		}
	}
	,__class__: haxor.graphics.texture.Bitmap
});
haxor.graphics.texture.Texture = function() {
	haxor.core.Resource.call(this);
	this.m_mipmaps = false;
	this.m_format = haxor.core.PixelFormat.RGBA8;
	this.m_minFilter = haxor.core.TextureFilter.Linear;
	this.m_magFilter = haxor.core.TextureFilter.Linear;
	this.m_wrap = haxor.core.TextureWrap.ClampX | haxor.core.TextureWrap.ClampY | haxor.core.TextureWrap.ClampZ;
	this.m_width = 0;
	this.m_height = 0;
	this.m_aniso = 0;
	this.__cid = haxor.context.EngineContext.texture.tid.get_id();
};
$hxClasses["haxor.graphics.texture.Texture"] = haxor.graphics.texture.Texture;
haxor.graphics.texture.Texture.__name__ = ["haxor","graphics","texture","Texture"];
haxor.graphics.texture.Texture.__super__ = haxor.core.Resource;
haxor.graphics.texture.Texture.prototype = $extend(haxor.core.Resource.prototype,{
	get_width: function() {
		return this.m_width;
	}
	,get_height: function() {
		return this.m_height;
	}
	,get_format: function() {
		return this.m_format;
	}
	,get_wrap: function() {
		return this.m_wrap;
	}
	,set_wrap: function(v) {
		if(this.m_wrap == v) return v;
		this.m_wrap = v;
		haxor.context.EngineContext.texture.UpdateParameters(this);
		return v;
	}
	,get_aniso: function() {
		return this.m_aniso;
	}
	,set_aniso: function(v) {
		if(this.m_aniso == v) return v;
		this.m_aniso = v;
		haxor.context.EngineContext.texture.UpdateParameters(this);
		return v;
	}
	,get_minFilter: function() {
		return this.m_minFilter;
	}
	,set_minFilter: function(v) {
		if(this.m_minFilter == v) return v;
		this.m_minFilter = v;
		haxor.context.EngineContext.texture.UpdateParameters(this);
		return v;
	}
	,get_magFilter: function() {
		return this.m_magFilter;
	}
	,set_magFilter: function(v) {
		if(this.m_magFilter == v) return v;
		this.m_magFilter = v;
		haxor.context.EngineContext.texture.UpdateParameters(this);
		return v;
	}
	,get_mipmaps: function() {
		return this.m_mipmaps;
	}
	,get_type: function() {
		return haxor.core.TextureType.None;
	}
	,Apply: function() {
		haxor.context.EngineContext.texture.Update(this);
	}
	,GenerateMipmaps: function() {
		if(this.m_mipmaps) return;
		this.m_mipmaps = true;
		haxor.context.EngineContext.texture.UpdateMipmaps(this);
	}
	,OnDestroy: function() {
		haxor.core.Resource.prototype.OnDestroy.call(this);
		haxor.context.EngineContext.texture.Destroy(this);
	}
	,__class__: haxor.graphics.texture.Texture
});
haxor.graphics.texture.Texture2D = function(p_width,p_height,p_format) {
	haxor.graphics.texture.Texture.call(this);
	this.m_format = p_format;
	this.m_width = p_width;
	this.m_height = p_height;
	if(p_width <= 0) return;
	if(p_height <= 0) return;
	this.m_data = new haxor.graphics.texture.Bitmap(p_width,p_height,p_format);
	haxor.context.EngineContext.texture.Create(this);
};
$hxClasses["haxor.graphics.texture.Texture2D"] = haxor.graphics.texture.Texture2D;
haxor.graphics.texture.Texture2D.__name__ = ["haxor","graphics","texture","Texture2D"];
haxor.graphics.texture.Texture2D.get_white = function() {
	if(haxor.graphics.texture.Texture2D.m_white != null) return haxor.graphics.texture.Texture2D.m_white;
	haxor.graphics.texture.Texture2D.m_white = new haxor.graphics.texture.Texture2D(1,1,haxor.core.PixelFormat.RGB8);
	haxor.graphics.texture.Texture2D.m_white.set_name("White");
	haxor.graphics.texture.Texture2D.m_white.m_data.Fill(new haxor.math.Color(1,1,1,1));
	haxor.graphics.texture.Texture2D.m_white.Apply();
	return haxor.graphics.texture.Texture2D.m_white;
};
haxor.graphics.texture.Texture2D.get_black = function() {
	if(haxor.graphics.texture.Texture2D.m_black != null) return haxor.graphics.texture.Texture2D.m_black;
	haxor.graphics.texture.Texture2D.m_black = new haxor.graphics.texture.Texture2D(1,1,haxor.core.PixelFormat.RGB8);
	haxor.graphics.texture.Texture2D.m_black.set_name("Black");
	haxor.graphics.texture.Texture2D.m_black.m_data.Fill(new haxor.math.Color(0,0,0,1));
	haxor.graphics.texture.Texture2D.m_black.Apply();
	return haxor.graphics.texture.Texture2D.m_black;
};
haxor.graphics.texture.Texture2D.get_red = function() {
	if(haxor.graphics.texture.Texture2D.m_red != null) return haxor.graphics.texture.Texture2D.m_red;
	haxor.graphics.texture.Texture2D.m_red = new haxor.graphics.texture.Texture2D(1,1,haxor.core.PixelFormat.RGB8);
	haxor.graphics.texture.Texture2D.m_red.set_name("Red");
	haxor.graphics.texture.Texture2D.m_red.m_data.Fill(new haxor.math.Color(1.0,0,0,1));
	haxor.graphics.texture.Texture2D.m_red.Apply();
	return haxor.graphics.texture.Texture2D.m_red;
};
haxor.graphics.texture.Texture2D.get_green = function() {
	if(haxor.graphics.texture.Texture2D.m_green != null) return haxor.graphics.texture.Texture2D.m_green;
	haxor.graphics.texture.Texture2D.m_green = new haxor.graphics.texture.Texture2D(1,1,haxor.core.PixelFormat.RGB8);
	haxor.graphics.texture.Texture2D.m_green.set_name("Green");
	haxor.graphics.texture.Texture2D.m_green.m_data.Fill(new haxor.math.Color(0,1,0,1));
	haxor.graphics.texture.Texture2D.m_green.Apply();
	return haxor.graphics.texture.Texture2D.m_green;
};
haxor.graphics.texture.Texture2D.get_random = function() {
	if(haxor.graphics.texture.Texture2D.m_random != null) return haxor.graphics.texture.Texture2D.m_random;
	haxor.graphics.texture.Texture2D.m_random = new haxor.graphics.texture.Texture2D(512,512,haxor.core.PixelFormat.Float4);
	haxor.graphics.texture.Texture2D.m_random.set_wrap(haxor.core.TextureWrap.RepeatX | haxor.core.TextureWrap.RepeatY);
	var _g1 = 0;
	var _g = haxor.graphics.texture.Texture2D.m_random.m_width;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = 0;
		var _g2 = haxor.graphics.texture.Texture2D.m_random.m_height;
		while(_g3 < _g2) {
			var j = _g3++;
			haxor.graphics.texture.Texture2D.m_random.m_data.Set(j,i,Math.random(),Math.random(),Math.random(),Math.random());
		}
	}
	haxor.graphics.texture.Texture2D.m_random.Upload(10);
	return haxor.graphics.texture.Texture2D.m_random;
};
haxor.graphics.texture.Texture2D.FromBitmap = function(p_bitmap,p_apply) {
	if(p_apply == null) p_apply = true;
	var t = new haxor.graphics.texture.Texture2D(0,0,p_bitmap.m_format);
	t.m_data = p_bitmap;
	t.m_width = p_bitmap.m_width;
	t.m_height = p_bitmap.m_height;
	haxor.context.EngineContext.texture.Create(t);
	t.Apply();
	return t;
};
haxor.graphics.texture.Texture2D.__super__ = haxor.graphics.texture.Texture;
haxor.graphics.texture.Texture2D.prototype = $extend(haxor.graphics.texture.Texture.prototype,{
	get_data: function() {
		return this.m_data;
	}
	,get_type: function() {
		return haxor.core.TextureType.Texture2D;
	}
	,Upload: function(p_steps,p_on_complete) {
		if(p_steps == null) p_steps = 200;
		haxor.context.EngineContext.texture.UploadTexture(this,0,0,this.m_width,this.m_height,p_steps,p_on_complete);
	}
	,__class__: haxor.graphics.texture.Texture2D
});
haxor.graphics.texture.ComputeTexture = function(p_width,p_height,p_format) {
	haxor.graphics.texture.Texture2D.call(this,p_width,p_height,p_format);
	this.set_minFilter(haxor.core.TextureFilter.Nearest);
	this.set_magFilter(haxor.core.TextureFilter.Nearest);
	this.m_lock = false;
	this.m_dirty = false;
};
$hxClasses["haxor.graphics.texture.ComputeTexture"] = haxor.graphics.texture.ComputeTexture;
haxor.graphics.texture.ComputeTexture.__name__ = ["haxor","graphics","texture","ComputeTexture"];
haxor.graphics.texture.ComputeTexture.__super__ = haxor.graphics.texture.Texture2D;
haxor.graphics.texture.ComputeTexture.prototype = $extend(haxor.graphics.texture.Texture2D.prototype,{
	get_type: function() {
		return haxor.core.TextureType.Compute;
	}
	,Write: function(p_x,p_y,p_v0,p_v1,p_v2,p_v3) {
		if(p_v3 == null) p_v3 = 0;
		if(p_v2 == null) p_v2 = 0;
		if(p_v1 == null) p_v1 = 0;
		if(p_v0 == null) p_v0 = 0;
		this.m_data.SetPixel(p_x,p_y,haxor.context.EngineContext.data.get_c().Set(p_v0,p_v1,p_v2,p_v3));
		this.m_dirty = true;
		this.Invalidate();
	}
	,WriteRange: function(p_values,p_x,p_y,p_width,p_height) {
		if(p_height == null) p_height = -1;
		if(p_width == null) p_width = -1;
		if(p_y == null) p_y = 0;
		if(p_x == null) p_x = 0;
		var w;
		if(p_width < 0) w = this.m_width; else w = p_width;
		var h;
		if(p_height < 0) h = this.m_height; else h = p_height;
		this.m_data.SetRange(p_x,p_y,w,h,p_values);
		this.Invalidate();
		this.m_dirty = true;
	}
	,Invalidate: function() {
		this.Apply();
	}
	,OnUploadComplete: function() {
		this.m_lock = false;
		if(this.m_dirty) this.Invalidate();
		this.m_dirty = false;
	}
	,__class__: haxor.graphics.texture.ComputeTexture
});
haxor.graphics.texture.RenderTexture = function(p_width,p_height,p_format,p_store_depth) {
	if(p_store_depth == null) p_store_depth = false;
	haxor.graphics.texture.Texture.call(this);
	this.m_format = p_format;
	this.m_width = p_width | 0;
	this.m_height = p_height | 0;
	var store_depth = p_store_depth && haxor.graphics.GL.TEXTURE_DEPTH_ENABLED;
	if(store_depth) this.m_depth = new haxor.graphics.texture.Texture2D(this.m_width,this.m_height,haxor.core.PixelFormat.Depth);
	haxor.context.EngineContext.texture.Create(this);
};
$hxClasses["haxor.graphics.texture.RenderTexture"] = haxor.graphics.texture.RenderTexture;
haxor.graphics.texture.RenderTexture.__name__ = ["haxor","graphics","texture","RenderTexture"];
haxor.graphics.texture.RenderTexture.__super__ = haxor.graphics.texture.Texture;
haxor.graphics.texture.RenderTexture.prototype = $extend(haxor.graphics.texture.Texture.prototype,{
	get_depth: function() {
		return this.m_depth;
	}
	,get_type: function() {
		return haxor.core.TextureType.RenderTexture;
	}
	,__class__: haxor.graphics.texture.RenderTexture
});
haxor.graphics.texture.TextureCube = function() {
	this.m_faces = [null,null,null,null,null,null];
	this.m_is_cross = false;
	haxor.graphics.texture.Texture.call(this);
	haxor.context.EngineContext.texture.Create(this);
};
$hxClasses["haxor.graphics.texture.TextureCube"] = haxor.graphics.texture.TextureCube;
haxor.graphics.texture.TextureCube.__name__ = ["haxor","graphics","texture","TextureCube"];
haxor.graphics.texture.TextureCube.FromCrossTexture = function(p_texture) {
	return null;
};
haxor.graphics.texture.TextureCube.__super__ = haxor.graphics.texture.Texture;
haxor.graphics.texture.TextureCube.prototype = $extend(haxor.graphics.texture.Texture.prototype,{
	get_px: function() {
		return this.m_faces[0];
	}
	,set_px: function(v) {
		this.InvalidateCross();
		this.m_faces[0] = v;
		return v;
	}
	,get_nx: function() {
		return this.m_faces[1];
	}
	,set_nx: function(v) {
		this.InvalidateCross();
		this.m_faces[1] = v;
		return v;
	}
	,get_py: function() {
		return this.m_faces[2];
	}
	,set_py: function(v) {
		this.InvalidateCross();
		this.m_faces[2] = v;
		return v;
	}
	,get_ny: function() {
		return this.m_faces[3];
	}
	,set_ny: function(v) {
		this.InvalidateCross();
		this.m_faces[3] = v;
		return v;
	}
	,get_pz: function() {
		return this.m_faces[4];
	}
	,set_pz: function(v) {
		this.InvalidateCross();
		this.m_faces[4] = v;
		return v;
	}
	,get_nz: function() {
		return this.m_faces[5];
	}
	,set_nz: function(v) {
		this.InvalidateCross();
		this.m_faces[5] = v;
		return v;
	}
	,OnDestroy: function() {
		haxor.graphics.texture.Texture.prototype.OnDestroy.call(this);
		var _g1 = 0;
		var _g = this.m_faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.m_faces[i] != null) haxor.core.Resource.Destroy(this.m_faces[i]);
		}
	}
	,InvalidateCross: function() {
		if(!this.m_is_cross) return;
		var _g1 = 0;
		var _g = this.m_faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.m_faces[i] != null) haxor.core.Resource.Destroy(this.m_faces[i]);
		}
	}
	,__class__: haxor.graphics.texture.TextureCube
});
haxor.input = {};
haxor.input.Input = function() { };
$hxClasses["haxor.input.Input"] = haxor.input.Input;
haxor.input.Input.__name__ = ["haxor","input","Input"];
haxor.input.Input.get_touches = function() {
	return haxor.input.Input.m_touches;
};
haxor.input.Input.get_joystick = function() {
	return haxor.input.Input.m_joysticks;
};
haxor.input.Input.get_multitouch = function() {
	return haxor.input.Input.m_multitouch;
};
haxor.input.Input.GetInputState = function(p_code) {
	return haxor.input.Input.m_state.get(p_code);
};
haxor.input.Input.Pressed = function(p_code) {
	var s = haxor.input.Input.GetInputState(p_code);
	return s == haxor.core.InputState.Down || s == haxor.core.InputState.Hold;
};
haxor.input.Input.Down = function(p_code) {
	var s = haxor.input.Input.GetInputState(p_code);
	return s == haxor.core.InputState.Down;
};
haxor.input.Input.Hit = function(p_code) {
	var s = haxor.input.Input.GetInputState(p_code);
	return s == haxor.core.InputState.Up;
};
haxor.input.Input.GetHoldTime = function(p_code) {
	return haxor.input.Input.m_hold.get(p_code);
};
haxor.input.Input.Initialize = function() {
	haxor.input.Input.m_state = new haxe.ds.IntMap();
	haxor.input.Input.m_hold = new haxe.ds.IntMap();
	haxor.input.Input.m_active = new Array();
	haxor.input.Input.m_down = new Array();
	haxor.input.Input.m_touches = [];
	haxor.input.Input.m_api_touches = [];
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		haxor.input.Input.m_api_touches.push(new haxor.input.Touch());
	}
	var _g1 = 0;
	while(_g1 < 256) {
		var i1 = _g1++;
		haxor.input.Input.m_state.set(i1,haxor.core.InputState.None);
		haxor.input.Input.m_hold.set(i1,0);
		haxor.input.Input.m_down.push(false);
	}
	haxor.input.Input.m_joysticks = [];
	haxor.input.Input.m_api_joystick = [];
	var _g2 = 0;
	while(_g2 < 10) {
		var i2 = _g2++;
		haxor.input.Input.m_api_joystick.push(new haxor.input.Joystick());
	}
	haxor.input.Input.mouse = new haxor.math.Vector2();
	haxor.input.Input.deltaMouse = new haxor.math.Vector2();
	haxor.input.Input.relativeMouse = new haxor.math.Vector2();
	haxor.core.Console.Log("Haxor> Input Initialize",4);
};
haxor.input.Input.UpdateTouchFSM = function() {
	var _g1 = 0;
	var _g = haxor.input.Input.m_touches.length;
	while(_g1 < _g) {
		var j = _g1++;
		haxor.input.Input.TouchFSM(haxor.input.Input.m_touches[j]);
	}
};
haxor.input.Input.UpdateInput = function() {
	var _g1 = 0;
	var _g = haxor.input.Input.m_active.length;
	while(_g1 < _g) {
		var i = _g1++;
		haxor.input.Input.UpdateInputState(haxor.input.Input.m_active[i],haxor.input.Input.m_down[haxor.input.Input.m_active[i]]);
	}
};
haxor.input.Input.TouchFSM = function(t) {
	if(t == null) return;
	var current = t.state;
	var d = t.m_down;
	if(current == haxor.core.InputState.Up) HxOverrides.remove(haxor.input.Input.m_touches,t);
	if(current == haxor.core.InputState.Hold) t.hold += haxor.core.Time.m_delta;
	t.state = haxor.input.Input.InputStateFSM(current,d);
};
haxor.input.Input.UpdateInputState = function(p_code,p_is_down,p_update_state) {
	if(p_update_state == null) p_update_state = true;
	var current = haxor.input.Input.m_state.get(p_code);
	if(current == null) current = haxor.core.InputState.None;
	var next = current;
	var d0 = haxor.input.Input.m_down[p_code];
	var d = haxor.input.Input.m_down[p_code] = p_is_down;
	if(!d0) {
		if(d) haxor.input.Input.m_active.push(p_code);
	}
	if(!d) {
		if(d0) return;
	}
	if(p_update_state) {
		if(current == haxor.core.InputState.Up) {
			haxor.input.Input.m_hold.set(p_code,0);
			HxOverrides.remove(haxor.input.Input.m_active,p_code);
		}
		if(current == haxor.core.InputState.Hold) {
			var h = haxor.input.Input.m_hold.get(p_code);
			haxor.input.Input.m_hold.set(p_code,h + haxor.core.Time.m_delta);
		}
		next = haxor.input.Input.InputStateFSM(current,d);
		if(current != next) haxor.input.Input.m_state.set(p_code,next);
	}
};
haxor.input.Input.InputStateFSM = function(p_current,p_is_down) {
	var current = p_current;
	var next = current;
	var d = p_is_down;
	switch(current[1]) {
	case 0:
		if(d) next = haxor.core.InputState.Down;
		break;
	case 1:
		if(!d) next = haxor.core.InputState.Up;
		next = haxor.core.InputState.Hold;
		break;
	case 2:
		next = haxor.core.InputState.None;
		break;
	case 3:
		if(!d) next = haxor.core.InputState.Up;
		break;
	}
	return next;
};
haxor.input.InputHandler = function() {
};
$hxClasses["haxor.input.InputHandler"] = haxor.input.InputHandler;
haxor.input.InputHandler.__name__ = ["haxor","input","InputHandler"];
haxor.input.InputHandler.prototype = {
	Update: function() {
		haxor.input.Input.UpdateInput();
		haxor.input.Input.UpdateTouchFSM();
		this.UpdateInput();
		if(haxor.input.Input.emulateTouch) {
			this.EmulateTouch(haxor.input.KeyCode.Mouse0,0);
			this.EmulateTouch(haxor.input.KeyCode.Mouse1,2);
			this.EmulateTouch(haxor.input.KeyCode.Mouse2,1);
		}
	}
	,UpdateInput: function() {
	}
	,Clear: function() {
		haxor.input.Input.wheel = 0;
		haxor.input.Input.deltaMouse.x = 0;
		haxor.input.Input.deltaMouse.y = 0;
	}
	,OnMouseMove: function(p_x,p_y) {
		haxor.input.Input.deltaMouse.x = p_x - haxor.input.Input.mouse.x;
		haxor.input.Input.deltaMouse.y = p_y - haxor.input.Input.mouse.y;
		haxor.input.Input.mouse.x = p_x;
		haxor.input.Input.mouse.y = p_y;
		haxor.input.Input.relativeMouse.x = haxor.input.Input.mouse.x / haxor.graphics.Screen.m_width;
		haxor.input.Input.relativeMouse.y = haxor.input.Input.mouse.y / haxor.graphics.Screen.m_height;
	}
	,OnMouseWheel: function(p_wheel) {
		haxor.input.Input.wheel = p_wheel;
	}
	,OnMouseButton: function(p_button,p_down) {
		switch(p_button) {
		case 0:
			haxor.input.Input.UpdateInputState(haxor.input.KeyCode.Mouse0,p_down,false);
			break;
		case 1:
			haxor.input.Input.UpdateInputState(haxor.input.KeyCode.Mouse1,p_down,false);
			break;
		case 2:
			haxor.input.Input.UpdateInputState(haxor.input.KeyCode.Mouse2,p_down,false);
			break;
		case 3:
			haxor.input.Input.UpdateInputState(haxor.input.KeyCode.Mouse3,p_down,false);
			break;
		case 4:
			haxor.input.Input.UpdateInputState(haxor.input.KeyCode.Mouse4,p_down,false);
			break;
		}
	}
	,OnKey: function(p_code,p_down) {
		haxor.input.Input.UpdateInputState(p_code,p_down,false);
	}
	,OnTouchStart: function(p_id,p_x,p_y,p_rx,p_ry,p_pressure,p_angle) {
		if(p_angle == null) p_angle = 0.0;
		if(p_pressure == null) p_pressure = 0.0;
		if(p_ry == null) p_ry = 0.0;
		if(p_rx == null) p_rx = 0.0;
		var t = haxor.input.Input.m_api_touches[p_id];
		t.id = p_id;
		t.position.x = p_x;
		t.position.y = p_y;
		t.relativePosition.x = t.position.x / haxor.graphics.Screen.m_width;
		t.relativePosition.y = t.position.y / haxor.graphics.Screen.m_height;
		t.delta.x = 0.0;
		t.delta.y = 0.0;
		t.pressure = p_pressure;
		t.radius.x = p_rx;
		t.radius.y = p_ry;
		t.angle = p_angle;
		t.m_down = true;
		if(HxOverrides.indexOf(haxor.input.Input.m_touches,t,0) < 0) haxor.input.Input.m_touches.push(t);
	}
	,OnTouchMove: function(p_id,p_x,p_y) {
		var t = haxor.input.Input.m_api_touches[p_id];
		if(t.id >= 0) {
			t.delta.x = p_x - t.position.x;
			t.delta.y = p_y - t.position.y;
		}
		t.position.x = p_x;
		t.position.y = p_y;
		t.relativePosition.x = t.position.x / haxor.graphics.Screen.m_width;
		t.relativePosition.y = t.position.y / haxor.graphics.Screen.m_height;
	}
	,OnTouchCancel: function(p_id) {
		var t = haxor.input.Input.m_api_touches[p_id];
		t.m_down = false;
	}
	,OnTouchEnd: function(p_id) {
		var t = haxor.input.Input.m_api_touches[p_id];
		t.m_down = false;
	}
	,OnJoystickStart: function(p_id,p_name) {
		this.m_joystick = null;
		var jk = haxor.input.Input.m_api_joystick[p_id];
		if(jk == null) return;
		this.m_joystick = jk;
		if(HxOverrides.indexOf(haxor.input.Input.m_joysticks,jk,0) >= 0) return;
		jk.id = p_id;
		jk.name = p_name;
		haxor.input.Input.m_joysticks.push(jk);
		haxor.input.Joystick.available = haxor.input.Input.m_joysticks.length > 0;
	}
	,OnJoystickDataUpdate: function(p_code,p_value,p_is_analog) {
		if(this.m_joystick == null) return;
		if(!p_is_analog) {
			this.m_joystick.button[p_code] = p_value;
			this.m_joystick.state[p_code] = haxor.input.Input.InputStateFSM(this.m_joystick.state[p_code],this.m_joystick.button[p_code] >= haxor.input.Joystick.buttonBias);
			if(this.m_joystick.state[p_code] == haxor.core.InputState.Hold) this.m_joystick.hold[p_code] += haxor.core.Time.m_delta;
			if(this.m_joystick.state[p_code] == haxor.core.InputState.None) this.m_joystick.hold[p_code] = 0.0;
		} else this.m_joystick.analog[p_code] = p_value;
	}
	,OnJoystickAnalogUpdate: function() {
		if(this.m_joystick == null) return;
		var b0 = haxor.input.Joystick.analogBias[0];
		var b1 = haxor.input.Joystick.analogBias[1];
		var s = 1.0;
		var v;
		var jk = this.m_joystick;
		v = jk.analogLeft;
		v.x = jk.analog[haxor.input.KeyCode.LeftAnalogueHor];
		if(v.x < 0.0) s = -1.0; else s = 1.0;
		v.x = haxor.math.Mathf.Clamp01((haxor.math.Mathf.Abs(v.x) - b0) / (b1 - b0));
		v.x = s * (v.x * 100.0 | 0) * 0.01;
		v.y = jk.analog[haxor.input.KeyCode.LeftAnalogueVert];
		if(v.y < 0.0) s = -1.0; else s = 1.0;
		v.y = haxor.math.Mathf.Clamp01((haxor.math.Mathf.Abs(v.y) - b0) / (b1 - b0));
		v.y = -s * (v.y * 100.0 | 0) * 0.01;
		if(jk.button[haxor.input.KeyCode.LeftAnalogueStick] > 0.5) v.z = 1.0; else v.z = 0.0;
		v = jk.analogRight;
		v.x = jk.analog[haxor.input.KeyCode.RightAnalogueHor];
		if(v.x < 0.0) s = -1.0; else s = 1.0;
		v.x = haxor.math.Mathf.Clamp01((haxor.math.Mathf.Abs(v.x) - b0) / (b1 - b0));
		v.x = s * (v.x * 100.0 | 0) * 0.01;
		v.y = jk.analog[haxor.input.KeyCode.RightAnalogueVert];
		if(v.y < 0.0) s = -1.0; else s = 1.0;
		v.y = haxor.math.Mathf.Clamp01((haxor.math.Mathf.Abs(v.y) - b0) / (b1 - b0));
		v.y = -s * (v.y * 100.0 | 0) * 0.01;
		if(jk.button[haxor.input.KeyCode.RightAnalogueStick] > 0.5) v.z = 1.0; else v.z = 0.0;
		jk.triggerLeft = jk.button[haxor.input.KeyCode.LeftShoulderBottom];
		jk.triggerLeft = haxor.math.Mathf.Clamp01((jk.triggerLeft - b0) / (b1 - b0));
		jk.triggerRight = jk.button[haxor.input.KeyCode.RightShoulderBottom];
		jk.triggerRight = haxor.math.Mathf.Clamp01((jk.triggerRight - b0) / (b1 - b0));
	}
	,RequestJoystickVibration: function(p_joystick) {
	}
	,EmulateTouch: function(p_code,p_id) {
		if(haxor.input.Input.Down(p_code)) {
			var p = haxor.context.EngineContext.data.get_v2();
			switch(p_id) {
			case 0:
				p.Set2(haxor.input.Input.mouse);
				break;
			case 1:
				p.Set(haxor.graphics.Screen.m_width * 0.5,haxor.graphics.Screen.m_height * 0.5);
				break;
			case 2:
				p.Set(haxor.graphics.Screen.m_width * Math.random(),haxor.graphics.Screen.m_height * Math.random());
				break;
			}
			this.OnTouchStart(p_id,p.x,p.y);
		}
		if(p_id == 0) {
			if(haxor.input.Input.Pressed(p_code)) {
				if(haxor.input.Input.deltaMouse.get_length() > 0) this.OnTouchMove(p_id,haxor.input.Input.mouse.x,haxor.input.Input.mouse.y);
			}
		}
		if(haxor.input.Input.Hit(p_code)) this.OnTouchEnd(p_id);
	}
	,__class__: haxor.input.InputHandler
};
haxor.input.Joystick = function() {
	var st = haxor.core.InputState.None;
	this.name = "";
	this.id = -1;
	this.button = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.state = [st,st,st,st,st,st,st,st,st,st,st,st,st,st,st,st,st,st,st,st];
	this.hold = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.analog = [0,0,0,0,0,0,0,0];
	this.analogLeft = new haxor.math.Vector3();
	this.analogRight = new haxor.math.Vector3();
	this.triggerLeft = 0.0;
	this.triggerRight = 0.0;
	this.m_vibrationLeft = 0.0;
	this.m_vibrationRight = 0.0;
};
$hxClasses["haxor.input.Joystick"] = haxor.input.Joystick;
haxor.input.Joystick.__name__ = ["haxor","input","Joystick"];
haxor.input.Joystick.prototype = {
	get_vibrationLeft: function() {
		return this.m_vibrationLeft;
	}
	,set_vibrationLeft: function(v) {
		if(haxor.math.Mathf.Abs(this.m_vibrationLeft - v) <= 0.0) return v;
		this.m_vibrationLeft = v;
		haxor.input.Input.m_handler.RequestJoystickVibration(this);
		return v;
	}
	,get_vibrationRight: function() {
		return this.m_vibrationRight;
	}
	,set_vibrationRight: function(v) {
		if(haxor.math.Mathf.Abs(this.m_vibrationRight - v) <= 0.0) return v;
		this.m_vibrationRight = v;
		haxor.input.Input.m_handler.RequestJoystickVibration(this);
		return v;
	}
	,Pressed: function(p_button) {
		return this.state[p_button] == haxor.core.InputState.Hold || this.state[p_button] == haxor.core.InputState.Down;
	}
	,Down: function(p_button) {
		return this.state[p_button] == haxor.core.InputState.Down;
	}
	,Hit: function(p_button) {
		return this.state[p_button] == haxor.core.InputState.Up;
	}
	,ToString: function(p_analog,p_button,p_trigger,p_pad) {
		if(p_pad == null) p_pad = true;
		if(p_trigger == null) p_trigger = true;
		if(p_button == null) p_button = true;
		if(p_analog == null) p_analog = true;
		var s = "";
		s += "J" + this.id;
		if(p_analog) {
			s += " AL" + this.analogLeft.ToString(1);
			s += " AR" + this.analogRight.ToString(1);
		}
		if(p_button) {
			s += " A[" + (this.Pressed(haxor.input.KeyCode.ButtonA)?"1]":"0]");
			s += " B[" + (this.Pressed(haxor.input.KeyCode.ButtonB)?"1]":"0]");
			s += " X[" + (this.Pressed(haxor.input.KeyCode.ButtonX)?"1]":"0]");
			s += " Y[" + (this.Pressed(haxor.input.KeyCode.ButtonY)?"1]":"0]");
			s += " L[" + (this.Pressed(haxor.input.KeyCode.LeftShoulder)?"1]":"0]");
			s += " R[" + (this.Pressed(haxor.input.KeyCode.RightShoulder)?"1]":"0]");
			s += " LB[" + (this.Pressed(haxor.input.KeyCode.LeftShoulderBottom)?"1]":"0]");
			s += " RB[" + (this.Pressed(haxor.input.KeyCode.RightShoulderBottom)?"1]":"0]");
			s += " Start[" + (this.Pressed(haxor.input.KeyCode.ButtonStart)?"1]":"0]");
			s += " Select[" + (this.Pressed(haxor.input.KeyCode.ButtonSelect)?"1]":"0]");
		}
		if(p_pad) {
			s += " PL[" + (this.Pressed(haxor.input.KeyCode.PadLeft)?"1]":"0]");
			s += " PR[" + (this.Pressed(haxor.input.KeyCode.PadRight)?"1]":"0]");
			s += " PU[" + (this.Pressed(haxor.input.KeyCode.PadTop)?"1]":"0]");
			s += " PD[" + (this.Pressed(haxor.input.KeyCode.PadBottom)?"1]":"0]");
		}
		if(p_trigger) {
			s += " TL[" + haxor.math.Mathf.RoundPlaces(this.triggerLeft,1) + "]";
			s += " TR[" + haxor.math.Mathf.RoundPlaces(this.triggerRight,1) + "]";
		}
		return s;
	}
	,__class__: haxor.input.Joystick
};
haxor.input.KeyCode = function() { };
$hxClasses["haxor.input.KeyCode"] = haxor.input.KeyCode;
haxor.input.KeyCode.__name__ = ["haxor","input","KeyCode"];
haxor.input.Touch = function() {
	this.state = haxor.core.InputState.None;
	this.id = -1;
	this.position = new haxor.math.Vector2();
	this.delta = new haxor.math.Vector2();
	this.relativePosition = new haxor.math.Vector2();
	this.pressure = 0;
	this.hold = 0;
	this.angle = 0;
	this.radius = new haxor.math.Vector2();
	this.m_down = false;
};
$hxClasses["haxor.input.Touch"] = haxor.input.Touch;
haxor.input.Touch.__name__ = ["haxor","input","Touch"];
haxor.input.Touch.prototype = {
	ToString: function() {
		return "id[" + this.id + "] pos" + this.position.ToString(2) + "[" + Std.string(this.state) + "]";
	}
	,__class__: haxor.input.Touch
};
haxor.io = {};
haxor.io.Buffer = function(p_length) {
	this.Resize(p_length);
};
$hxClasses["haxor.io.Buffer"] = haxor.io.Buffer;
haxor.io.Buffer.__name__ = ["haxor","io","Buffer"];
haxor.io.Buffer.FromString = function(p_string) {
	var b = new haxor.io.Buffer(p_string.length);
	b.SetString(p_string);
	return b;
};
haxor.io.Buffer.prototype = {
	get_buffer: function() {
		return this.m_buffer;
	}
	,get_byteLength: function() {
		return this.m_length * this.get_bytesPerElement();
	}
	,get_bytesPerElement: function() {
		return 1;
	}
	,get_length: function() {
		return this.m_length;
	}
	,Resize: function(p_length) {
		this.m_length = p_length;
		var len = this.m_length * this.get_bytesPerElement();
		this.m_offset = 0;
		this.m_buffer = new Uint8Array(len);
		this.aux = this.m_buffer;
	}
	,GetByte: function(p_index) {
		return this.m_buffer[p_index];
		return 0;
	}
	,SetByte: function(p_index,p_value) {
		this.m_buffer[p_index] = p_value;
	}
	,SetBytes: function(p_list,p_offset) {
		if(p_offset == null) p_offset = 0;
		var _g1 = 0;
		var _g = p_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.SetByte(i + p_offset,p_list[i]);
		}
	}
	,SetBuffer: function(p_target,p_offset) {
		if(p_offset == null) p_offset = 0;
		var _g1 = 0;
		var _g = p_target.m_length * p_target.get_bytesPerElement();
		while(_g1 < _g) {
			var i = _g1++;
			this.SetByte(i + p_offset,p_target.GetByte(i));
		}
	}
	,EncodeBase64: function() {
		var b = haxe.io.Bytes.alloc(this.m_length * this.get_bytesPerElement());
		var _g1 = 0;
		var _g = b.length;
		while(_g1 < _g) {
			var i = _g1++;
			b.set(i,this.GetByte(i));
		}
		var res = haxe.crypto.Base64.encode(b);
		var new_len = Std["int"](res.length / this.get_bytesPerElement());
		this.Resize(new_len);
		this.SetString(res);
		return res;
	}
	,DecodeBase64: function() {
		var b64 = this.GetString();
		var b = haxe.crypto.Base64.decode(b64);
		var new_len = Std["int"](b.length / this.get_bytesPerElement());
		this.Resize(new_len);
		var _g1 = 0;
		var _g = b.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.SetByte(i,b.b[i]);
		}
	}
	,GetString: function(p_offset,p_length) {
		if(p_length == null) p_length = 0;
		if(p_offset == null) p_offset = 0;
		var len;
		if(p_length <= 0) len = this.m_length * this.get_bytesPerElement(); else len = p_length;
		var s = new StringBuf();
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			s.addChar(this.GetByte(i + p_offset));
		}
		return s.b;
	}
	,SetString: function(p_string,p_offset) {
		if(p_offset == null) p_offset = 0;
		var _g1 = 0;
		var _g = p_string.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.SetByte(i + p_offset,HxOverrides.cca(p_string,i));
		}
	}
	,SetViewSlice: function(p_start,p_length) {
		var i0 = p_start * this.get_bytesPerElement();
		var i1 = i0 + p_length * this.get_bytesPerElement();
		this.orig = this.aux;
		if(this.get_bytesPerElement() == 1) {
			var i8 = this.aux;
			this.aux = i8.subarray(i0,i1);
		}
	}
	,ResetSlice: function() {
		this.aux = this.orig;
	}
	,__class__: haxor.io.Buffer
};
haxor.io.FloatArray = function(p_length) {
	haxor.io.Buffer.call(this,p_length);
};
$hxClasses["haxor.io.FloatArray"] = haxor.io.FloatArray;
haxor.io.FloatArray.__name__ = ["haxor","io","FloatArray"];
haxor.io.FloatArray.Alloc = function(p_data) {
	var b = new haxor.io.FloatArray(p_data.length);
	b.SetRange(p_data);
	return b;
};
haxor.io.FloatArray.FromBase64 = function(p_data) {
	var b = new haxor.io.FloatArray(p_data.length / 4 | 0);
	b.SetString(p_data);
	b.DecodeBase64();
	return b;
};
haxor.io.FloatArray.Parse = function(p_data,p_delimiter) {
	if(p_delimiter == null) p_delimiter = " ";
	var tk = p_data.split(p_delimiter);
	var res = new haxor.io.FloatArray(tk.length);
	var _g1 = 0;
	var _g = tk.length;
	while(_g1 < _g) {
		var i = _g1++;
		res.Set(i,Std.parseFloat(StringTools.trim(tk[i])));
	}
	return res;
};
haxor.io.FloatArray.__super__ = haxor.io.Buffer;
haxor.io.FloatArray.prototype = $extend(haxor.io.Buffer.prototype,{
	get_bytesPerElement: function() {
		return 4;
	}
	,Resize: function(p_length) {
		haxor.io.Buffer.prototype.Resize.call(this,p_length);
		this.aux = new Float32Array(this.m_buffer.buffer);
	}
	,Get: function(p_index) {
		var f32 = this.aux;
		return f32[p_index];
	}
	,Set: function(p_index,p_value) {
		var f32 = this.aux;
		f32[p_index] = p_value;
	}
	,SetRange: function(p_data,p_offset) {
		if(p_offset == null) p_offset = 0;
		var _g1 = 0;
		var _g = p_data.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.Set(i + p_offset,p_data[i]);
		}
	}
	,SetViewSlice: function(p_start,p_length) {
		haxor.io.Buffer.prototype.SetViewSlice.call(this,p_start,p_length);
		var i0 = p_start;
		var i1 = i0 + p_length;
		var f32 = this.aux;
		this.aux = f32.subarray(i0,i1);
	}
	,__class__: haxor.io.FloatArray
});
haxor.io.Int32Array = function(p_length) {
	haxor.io.Buffer.call(this,p_length);
};
$hxClasses["haxor.io.Int32Array"] = haxor.io.Int32Array;
haxor.io.Int32Array.__name__ = ["haxor","io","Int32Array"];
haxor.io.Int32Array.Alloc = function(p_data) {
	var b = new haxor.io.Int32Array(p_data.length);
	b.SetRange(p_data);
	return b;
};
haxor.io.Int32Array.Parse = function(p_data,p_delimiter) {
	if(p_delimiter == null) p_delimiter = " ";
	var tk = p_data.split(p_delimiter);
	var res = new haxor.io.Int32Array(tk.length);
	var _g1 = 0;
	var _g = tk.length;
	while(_g1 < _g) {
		var i = _g1++;
		res.Set(i,Std.parseInt(StringTools.trim(tk[i])));
	}
	return res;
};
haxor.io.Int32Array.__super__ = haxor.io.Buffer;
haxor.io.Int32Array.prototype = $extend(haxor.io.Buffer.prototype,{
	get_bytesPerElement: function() {
		return 4;
	}
	,Resize: function(p_length) {
		haxor.io.Buffer.prototype.Resize.call(this,p_length);
		this.aux = new Int32Array(this.m_buffer.buffer);
	}
	,Get: function(p_index) {
		var i32 = this.aux;
		return i32[p_index];
	}
	,Set: function(p_index,p_value) {
		var i32 = this.aux;
		i32[p_index] = p_value;
	}
	,SetRange: function(p_data,p_offset) {
		if(p_offset == null) p_offset = 0;
		var _g1 = 0;
		var _g = p_data.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.Set(i + p_offset,p_data[i]);
		}
	}
	,SetViewSlice: function(p_start,p_length) {
		haxor.io.Buffer.prototype.SetViewSlice.call(this,p_start,p_length);
		var i0 = p_start;
		var i1 = i0 + p_length;
		var i32 = this.aux;
		this.aux = i32.subarray(i0,i1);
	}
	,__class__: haxor.io.Int32Array
});
haxor.io.UInt16Array = function(p_length) {
	haxor.io.Buffer.call(this,p_length);
};
$hxClasses["haxor.io.UInt16Array"] = haxor.io.UInt16Array;
haxor.io.UInt16Array.__name__ = ["haxor","io","UInt16Array"];
haxor.io.UInt16Array.Alloc = function(p_data) {
	var b = new haxor.io.UInt16Array(p_data.length);
	b.SetRange(p_data);
	return b;
};
haxor.io.UInt16Array.Parse = function(p_data,p_delimiter) {
	if(p_delimiter == null) p_delimiter = " ";
	var tk = p_data.split(p_delimiter);
	var res = new haxor.io.UInt16Array(tk.length);
	var _g1 = 0;
	var _g = tk.length;
	while(_g1 < _g) {
		var i = _g1++;
		res.Set(i,Std.parseInt(StringTools.trim(tk[i])));
	}
	return res;
};
haxor.io.UInt16Array.__super__ = haxor.io.Buffer;
haxor.io.UInt16Array.prototype = $extend(haxor.io.Buffer.prototype,{
	get_bytesPerElement: function() {
		return 2;
	}
	,Resize: function(p_length) {
		haxor.io.Buffer.prototype.Resize.call(this,p_length);
		this.aux = new Uint16Array(this.m_buffer.buffer);
	}
	,Get: function(p_index) {
		var i16 = this.aux;
		return i16[p_index];
	}
	,Set: function(p_index,p_value) {
		var i16 = this.aux;
		i16[p_index] = p_value;
	}
	,SetRange: function(p_data,p_offset) {
		if(p_offset == null) p_offset = 0;
		var _g1 = 0;
		var _g = p_data.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.Set(i + p_offset,p_data[i]);
		}
	}
	,SetViewSlice: function(p_start,p_length) {
		haxor.io.Buffer.prototype.SetViewSlice.call(this,p_start,p_length);
		var i0 = p_start;
		var i1 = i0 + p_length;
		var i16 = this.aux;
		this.aux = i16.subarray(i0,i1);
	}
	,__class__: haxor.io.UInt16Array
});
haxor.io.file = {};
haxor.io.file.Asset = function() { };
$hxClasses["haxor.io.file.Asset"] = haxor.io.file.Asset;
haxor.io.file.Asset.__name__ = ["haxor","io","file","Asset"];
haxor.io.file.Asset.Get = function(p_id) {
	if(haxor.io.file.Asset.m_database.exists(p_id)) return haxor.io.file.Asset.m_database.get(p_id); else return null;
};
haxor.io.file.Asset.Remove = function(p_id) {
	if(haxor.io.file.Asset.m_database.exists(p_id)) {
		var a = haxor.io.file.Asset.m_database.get(p_id);
		haxor.io.file.Asset.m_database.remove(p_id);
		return a;
	}
	return null;
};
haxor.io.file.Asset.Add = function(p_id,p_asset) {
	var value = p_asset;
	haxor.io.file.Asset.m_database.set(p_id,value);
	if(js.Boot.__instanceof(p_asset,haxor.core.Resource)) (js.Boot.__cast(p_asset , haxor.core.Resource)).__db = p_id;
};
haxor.math.AABB3 = function(p_x,p_y,p_z,p_width,p_height,p_depth) {
	if(p_depth == null) p_depth = 0;
	if(p_height == null) p_height = 0;
	if(p_width == null) p_width = 0;
	if(p_z == null) p_z = 0;
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.m_xMin = p_x;
	this.m_yMin = p_y;
	this.m_zMin = p_y;
	this.m_xMax = this.m_xMin + p_width;
	this.m_yMax = this.m_yMin + p_height;
	this.m_zMax = this.m_zMin + p_depth;
};
$hxClasses["haxor.math.AABB3"] = haxor.math.AABB3;
haxor.math.AABB3.__name__ = ["haxor","math","AABB3"];
haxor.math.AABB3.get_temp = function() {
	return haxor.context.EngineContext.data.get_aabb3();
};
haxor.math.AABB3.Center = function(p_b,p_result) {
	var v;
	if(p_result == null) v = new haxor.math.Vector3(0,0,0); else v = p_result;
	return v.Set(p_b.m_xMin + (p_b.m_xMax - p_b.m_xMin) * 0.5,p_b.m_yMin + (p_b.m_yMax - p_b.m_yMin) * 0.5,p_b.m_zMin + (p_b.m_zMax - p_b.m_zMin) * 0.5);
};
haxor.math.AABB3.FromMinMax = function(p_xmin,p_xmax,p_ymin,p_ymax,p_zmin,p_zmax,p_result) {
	var b;
	if(p_result == null) b = new haxor.math.AABB3(); else b = p_result;
	b.set_xMin(p_xmin);
	b.set_xMax(p_xmax);
	b.set_yMin(p_ymin);
	b.set_yMax(p_ymax);
	b.set_zMin(p_zmin);
	b.set_zMax(p_zmax);
	return b;
};
haxor.math.AABB3.FromCenter = function(p_x,p_y,p_z,p_width,p_height,p_depth,p_result) {
	var b;
	if(p_result == null) b = new haxor.math.AABB3(); else b = p_result;
	b.set_xMax(b.m_xMin + p_width);
	p_width;
	b.set_yMax(b.m_yMin + p_height);
	p_height;
	b.set_zMax(b.m_zMin + p_depth);
	p_depth;
	b.set_center(new haxor.math.Vector3(p_x,p_y,p_z));
	return b;
};
haxor.math.AABB3.get_empty = function() {
	return new haxor.math.AABB3();
};
haxor.math.AABB3.prototype = {
	get_clone: function() {
		return haxor.math.AABB3.FromMinMax(this.m_xMin,this.m_xMax,this.m_yMin,this.m_yMax,this.m_zMin,this.m_zMax);
	}
	,get_min: function() {
		return new haxor.math.Vector3(this.m_xMin,this.m_yMin);
	}
	,set_min: function(v) {
		this.set_xMin(v.x);
		this.set_yMin(v.y);
		return v;
	}
	,get_max: function() {
		return new haxor.math.Vector3(this.m_xMax,this.m_yMax);
	}
	,set_max: function(v) {
		this.set_xMax(v.x);
		this.set_yMax(v.y);
		return v;
	}
	,get_xMin: function() {
		return this.m_xMin;
	}
	,set_xMin: function(v) {
		this.m_xMin = v;
		this.Validate();
		return v;
	}
	,get_yMin: function() {
		return this.m_yMin;
	}
	,set_yMin: function(v) {
		this.m_yMin = v;
		this.Validate();
		return v;
	}
	,get_zMin: function() {
		return this.m_zMin;
	}
	,set_zMin: function(v) {
		this.m_zMin = v;
		this.Validate();
		return v;
	}
	,get_xMax: function() {
		return this.m_xMax;
	}
	,set_xMax: function(v) {
		this.m_xMax = v;
		this.Validate();
		return v;
	}
	,get_yMax: function() {
		return this.m_yMax;
	}
	,set_yMax: function(v) {
		this.m_yMax = v;
		this.Validate();
		return v;
	}
	,get_zMax: function() {
		return this.m_zMax;
	}
	,set_zMax: function(v) {
		this.m_zMax = v;
		this.Validate();
		return v;
	}
	,get_center: function() {
		return haxor.math.AABB3.Center(this);
	}
	,set_center: function(v) {
		var hw = haxor.math.Mathf.Abs(this.m_xMax - this.m_xMin) * 0.5;
		var hh = haxor.math.Mathf.Abs(this.m_yMax - this.m_yMin) * 0.5;
		var hd = haxor.math.Mathf.Abs(this.m_zMax - this.m_zMin) * 0.5;
		this.m_xMin = v.x - hw;
		this.m_xMax = v.x + hw;
		this.m_yMin = v.y - hh;
		this.m_yMax = v.y + hh;
		this.m_zMin = v.z - hd;
		this.m_zMax = v.z + hd;
		this.Validate();
		return v;
	}
	,get_x: function() {
		return this.m_xMin;
	}
	,set_x: function(v) {
		this.set_xMin(v);
		return v;
	}
	,get_y: function() {
		return this.m_yMin;
	}
	,set_y: function(v) {
		this.set_yMin(v);
		return v;
	}
	,get_z: function() {
		return this.m_zMin;
	}
	,set_z: function(v) {
		this.set_zMin(v);
		return v;
	}
	,get_width: function() {
		return haxor.math.Mathf.Abs(this.m_xMax - this.m_xMin);
	}
	,set_width: function(v) {
		this.set_xMax(this.m_xMin + v);
		return v;
	}
	,get_height: function() {
		return haxor.math.Mathf.Abs(this.m_yMax - this.m_yMin);
	}
	,set_height: function(v) {
		this.set_yMax(this.m_yMin + v);
		return v;
	}
	,get_depth: function() {
		return haxor.math.Mathf.Abs(this.m_zMax - this.m_zMin);
	}
	,set_depth: function(v) {
		this.set_zMax(this.m_zMin + v);
		return v;
	}
	,get_size: function() {
		return new haxor.math.Vector3(0,0,0).Set(haxor.math.Mathf.Abs(this.m_xMax - this.m_xMin),haxor.math.Mathf.Abs(this.m_yMax - this.m_yMin),haxor.math.Mathf.Abs(this.m_zMax - this.m_zMin));
	}
	,set_size: function(v) {
		this.set_width(v.x);
		this.set_height(v.y);
		this.set_depth(v.z);
		return v;
	}
	,Validate: function() {
		var x0 = this.m_xMin;
		var x1 = this.m_xMax;
		var y0 = this.m_yMin;
		var y1 = this.m_yMax;
		var z0 = this.m_zMin;
		var z1 = this.m_zMax;
		if(x0 <= x1) {
			this.m_xMin = x0;
			this.m_xMax = x1;
		} else {
			this.m_xMin = x1;
			this.m_xMax = x0;
		}
		if(y0 <= y1) {
			this.m_yMin = y0;
			this.m_yMax = y1;
		} else {
			this.m_yMin = y1;
			this.m_yMax = y0;
		}
		if(z0 <= z1) {
			this.m_zMin = z0;
			this.m_zMax = z1;
		} else {
			this.m_zMin = z1;
			this.m_zMax = z0;
		}
	}
	,Add: function(p_v) {
		this.m_xMax = Math.max(p_v.m_xMax,this.m_xMax);
		this.m_xMin = Math.min(p_v.m_xMin,this.m_xMin);
		this.m_yMax = Math.max(p_v.m_yMax,this.m_yMax);
		this.m_yMin = Math.min(p_v.m_yMin,this.m_yMin);
		this.m_zMax = Math.max(p_v.m_zMax,this.m_zMax);
		this.m_zMin = Math.min(p_v.m_zMin,this.m_zMin);
		return this;
	}
	,Set: function(p_xmin,p_xmax,p_ymin,p_ymax,p_zmin,p_zmax) {
		this.m_xMin = p_xmin;
		this.m_yMin = p_ymin;
		this.m_zMin = p_zmin;
		this.m_xMax = p_xmax;
		this.m_yMax = p_ymax;
		this.m_zMax = p_zmax;
		this.Validate();
		return this;
	}
	,SetAABB3: function(p_v) {
		this.m_xMin = p_v.m_xMin;
		this.m_yMin = p_v.m_yMin;
		this.m_zMin = p_v.m_zMin;
		this.m_xMax = p_v.m_xMax;
		this.m_yMax = p_v.m_yMax;
		this.m_zMax = p_v.m_zMax;
		return this;
	}
	,SetXYZWHD: function(p_x,p_y,p_z,p_width,p_height,p_depth) {
		if(p_depth == null) p_depth = 0;
		if(p_height == null) p_height = 0;
		if(p_width == null) p_width = 0;
		if(p_z == null) p_z = 0;
		if(p_y == null) p_y = 0;
		if(p_x == null) p_x = 0;
		this.m_xMin = p_x;
		this.m_yMin = p_y;
		this.m_zMin = p_y;
		this.m_xMax = this.m_xMin + p_width;
		this.m_yMax = this.m_yMin + p_height;
		this.m_zMax = this.m_zMin + p_depth;
		return this;
	}
	,Encapsulate: function(p_point) {
		return this.Encapsulate3(p_point.x,p_point.y,p_point.z);
	}
	,Encapsulate3: function(p_x,p_y,p_z) {
		if(p_z == null) p_z = 0;
		if(p_y == null) p_y = 0;
		if(p_x == null) p_x = 0;
		this.m_xMin = Math.min(p_x,this.m_xMin);
		this.m_xMax = Math.max(p_x,this.m_xMax);
		this.m_yMin = Math.min(p_y,this.m_yMin);
		this.m_yMax = Math.max(p_y,this.m_yMax);
		this.m_zMin = Math.min(p_z,this.m_zMin);
		this.m_zMax = Math.max(p_z,this.m_zMax);
		this.Validate();
		return this;
	}
	,ToString: function(p_places) {
		if(p_places == null) p_places = 2;
		var s0 = haxor.math.Mathf.RoundPlaces(this.m_xMin,p_places) + "";
		var s1 = haxor.math.Mathf.RoundPlaces(this.m_xMax,p_places) + "";
		var s2 = haxor.math.Mathf.RoundPlaces(this.m_yMin,p_places) + "";
		var s3 = haxor.math.Mathf.RoundPlaces(this.m_yMax,p_places) + "";
		var s4 = haxor.math.Mathf.RoundPlaces(this.m_zMin,p_places) + "";
		var s5 = haxor.math.Mathf.RoundPlaces(this.m_zMax,p_places) + "";
		return "[" + s0 + "," + s1 + "|" + s2 + "," + s3 + "|" + s4 + "," + s5 + "]";
	}
	,__class__: haxor.math.AABB3
};
haxor.math.Mathf = function() { };
$hxClasses["haxor.math.Mathf"] = haxor.math.Mathf;
haxor.math.Mathf.__name__ = ["haxor","math","Mathf"];
haxor.math.Mathf.IsPOT = function(p_v) {
	return p_v > 0 && (p_v & p_v - 1) == 0;
};
haxor.math.Mathf.NextPOT = function(p_v) {
	--p_v;
	p_v |= p_v >> 1;
	p_v |= p_v >> 2;
	p_v |= p_v >> 4;
	p_v |= p_v >> 8;
	p_v |= p_v >> 16;
	return ++p_v;
};
haxor.math.Mathf.Sign = function(p_a) {
	if(p_a < 0) return -1.0; else return 1.0;
};
haxor.math.Mathf.SignInt = function(p_a) {
	if(p_a < 0) return -1; else return 1;
};
haxor.math.Mathf.Abs = function(p_a) {
	if(p_a < 0) return -p_a; else return p_a;
};
haxor.math.Mathf.AbsInt = function(p_a) {
	if(p_a < 0) return -p_a; else return p_a;
};
haxor.math.Mathf.Clamp = function(p_v,p_min,p_max) {
	if(p_v <= p_min) return p_min; else if(p_v >= p_max) return p_max; else return p_v;
};
haxor.math.Mathf.Clamp01 = function(p_v) {
	if(p_v <= 0.0) return 0.0; else if(p_v >= 1.0) return 1.0; else return p_v;
};
haxor.math.Mathf.ClampInt = function(p_v,p_min,p_max) {
	return (p_v <= p_min?p_min:p_v >= p_max?p_max:p_v) | 0;
};
haxor.math.Mathf.Min = function(a,b) {
	return Math.min(a,b);
};
haxor.math.Mathf.MinRange = function(v) {
	if(v.length <= 0) return 0.0;
	var n = v[0];
	var _g1 = 1;
	var _g = v.length;
	while(_g1 < _g) {
		var i = _g1++;
		n = Math.min(n,v[i]);
	}
	return n;
};
haxor.math.Mathf.Max = function(a,b) {
	return Math.max(a,b);
};
haxor.math.Mathf.MaxRange = function(v) {
	if(v.length <= 0) return 0.0;
	var n = v[0];
	var _g1 = 1;
	var _g = v.length;
	while(_g1 < _g) {
		var i = _g1++;
		n = Math.max(n,v[i]);
	}
	return n;
};
haxor.math.Mathf.MinInt = function(a,b) {
	return Math.min(a,b);
};
haxor.math.Mathf.MaxInt = function(a,b) {
	return Math.max(a,b);
};
haxor.math.Mathf.Sin = function(v) {
	return Math.sin(v);
};
haxor.math.Mathf.Cos = function(v) {
	return Math.cos(v);
};
haxor.math.Mathf.Asin = function(v) {
	return Math.asin(v);
};
haxor.math.Mathf.Acos = function(v) {
	return Math.acos(v);
};
haxor.math.Mathf.Tan = function(v) {
	return Math.tan(v);
};
haxor.math.Mathf.ATan = function(v) {
	return Math.atan(v);
};
haxor.math.Mathf.ATan2 = function(y,x) {
	return Math.atan2(y,x);
};
haxor.math.Mathf.Sqrt = function(v) {
	return Math.sqrt(v);
};
haxor.math.Mathf.Pow = function(b,exp) {
	return Math.pow(b,exp);
};
haxor.math.Mathf.Floor = function(p_v) {
	return p_v | 0;
};
haxor.math.Mathf.Ceil = function(p_v) {
	return p_v + (p_v < 0?-0.9999999:0.9999999) | 0;
};
haxor.math.Mathf.Round = function(p_v) {
	return p_v + (p_v < 0?-0.5:0.5) | 0;
};
haxor.math.Mathf.RoundPlaces = function(p_v,p_decimal_places) {
	if(p_decimal_places == null) p_decimal_places = 2;
	var d = Math.pow(10,p_decimal_places);
	return haxor.math.Mathf.Round(p_v * d) / d;
};
haxor.math.Mathf.Lerp = function(p_a,p_b,p_ratio) {
	return p_a + (p_b - p_a) * p_ratio;
};
haxor.math.Mathf.LerpInt = function(p_a,p_b,p_ratio) {
	return Std["int"](haxor.math.Mathf.Lerp(p_a,p_b,p_ratio));
};
haxor.math.Mathf.Frac = function(p_v) {
	return p_v - Math.floor(p_v);
};
haxor.math.Mathf.Loop = function(p_v,p_v0,p_v1) {
	var vv0 = Math.min(p_v0,p_v1);
	var vv1 = Math.max(p_v0,p_v1);
	var dv = vv1 - vv0;
	if(dv <= 0) return vv0;
	var n = (p_v - p_v0) / dv;
	var r;
	if(p_v < 0) r = 1.0 - haxor.math.Mathf.Frac(n < 0?-n:n); else r = n - Math.floor(n);
	return p_v0 + (p_v1 - p_v0) * r;
};
haxor.math.Mathf.Linear2Gamma = function(p_v) {
	return Math.pow(p_v,2.2);
};
haxor.math.Mathf.Oscilate = function(p_v,p_v0,p_v1) {
	var w = -haxor.math.Mathf.Abs(haxor.math.Mathf.Loop(p_v - 1.0,-1.0,1.0)) + 1.0;
	return w + (p_v0 - w) * p_v1;
};
haxor.math.Mathf.WrapAngle = function(p_angle) {
	if(p_angle < -360.0) return 360 + p_angle;
	if(p_angle > 360.0) return p_angle - 360;
	return p_angle;
};
haxor.math.Matrix4 = function(p_m00,p_m01,p_m02,p_m03,p_m10,p_m11,p_m12,p_m13,p_m20,p_m21,p_m22,p_m23,p_m30,p_m31,p_m32,p_m33) {
	if(p_m33 == null) p_m33 = 0;
	if(p_m32 == null) p_m32 = 0;
	if(p_m31 == null) p_m31 = 0;
	if(p_m30 == null) p_m30 = 0;
	if(p_m23 == null) p_m23 = 0;
	if(p_m22 == null) p_m22 = 0;
	if(p_m21 == null) p_m21 = 0;
	if(p_m20 == null) p_m20 = 0;
	if(p_m13 == null) p_m13 = 0;
	if(p_m12 == null) p_m12 = 0;
	if(p_m11 == null) p_m11 = 0;
	if(p_m10 == null) p_m10 = 0;
	if(p_m03 == null) p_m03 = 0;
	if(p_m02 == null) p_m02 = 0;
	if(p_m01 == null) p_m01 = 0;
	if(p_m00 == null) p_m00 = 0;
	this.m00 = p_m00;
	this.m01 = p_m01;
	this.m02 = p_m02;
	this.m03 = p_m03;
	this.m10 = p_m10;
	this.m11 = p_m11;
	this.m12 = p_m12;
	this.m13 = p_m13;
	this.m20 = p_m20;
	this.m21 = p_m21;
	this.m22 = p_m22;
	this.m23 = p_m23;
	this.m30 = p_m30;
	this.m31 = p_m31;
	this.m32 = p_m32;
	this.m33 = p_m33;
};
$hxClasses["haxor.math.Matrix4"] = haxor.math.Matrix4;
haxor.math.Matrix4.__name__ = ["haxor","math","Matrix4"];
haxor.math.Matrix4.get_temp = function() {
	return haxor.context.EngineContext.data.get_m4();
};
haxor.math.Matrix4.get_identity = function() {
	return new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
};
haxor.math.Matrix4.FromQuaternion = function(p_quaternion,p_result) {
	var m;
	if(p_result == null) m = new haxor.math.Matrix4(); else m = p_result;
	var q = p_quaternion;
	var x2 = q.x * q.x;
	var y2 = q.y * q.y;
	var z2 = q.z * q.z;
	var xy = q.x * q.y;
	var xz = q.x * q.z;
	var yz = q.y * q.z;
	var xw = q.w * q.x;
	var yw = q.w * q.y;
	var zw = q.w * q.z;
	m.m00 = 1.0 - 2.0 * (y2 + z2);
	m.m01 = 2.0 * (xy - zw);
	m.m02 = 2.0 * (xz + yw);
	m.m10 = 2.0 * (xy + zw);
	m.m11 = 1.0 - 2.0 * (x2 + z2);
	m.m12 = 2.0 * (yz - xw);
	m.m20 = 2.0 * (xz - yw);
	m.m21 = 2.0 * (yz + xw);
	m.m22 = 1.0 - 2.0 * (x2 + y2);
	m.m30 = m.m31 = m.m32 = 0.0;
	m.m33 = 1.0;
	return m;
};
haxor.math.Matrix4.FromArray = function(p_array,p_result) {
	var res;
	if(p_result == null) res = new haxor.math.Matrix4(); else res = p_result;
	var _g1 = 0;
	var _g = p_array.length;
	while(_g1 < _g) {
		var i = _g1++;
		res.SetIndex(i,p_array[i]);
	}
	return res;
};
haxor.math.Matrix4.TRS = function(p_position,p_rotation,p_scale,p_result) {
	var sx;
	if(p_scale == null) sx = 1.0; else sx = p_scale.x;
	var sy;
	if(p_scale == null) sy = 1.0; else sy = p_scale.y;
	var sz;
	if(p_scale == null) sz = 1.0; else sz = p_scale.z;
	var px = p_position.x;
	var py = p_position.y;
	var pz = p_position.z;
	var r = haxor.context.EngineContext.data.get_m4();
	haxor.math.Matrix4.FromQuaternion(p_rotation,r);
	var l;
	if(p_result == null) l = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1); else l = p_result;
	l.m00 = r.m00 * sx;
	l.m01 = r.m01 * sy;
	l.m02 = r.m02 * sz;
	l.m03 = px;
	l.m10 = r.m10 * sx;
	l.m11 = r.m11 * sy;
	l.m12 = r.m12 * sz;
	l.m13 = py;
	l.m20 = r.m20 * sx;
	l.m21 = r.m21 * sy;
	l.m22 = r.m22 * sz;
	l.m23 = pz;
	l.m30 = l.m31 = l.m32 = 0.0;
	l.m33 = 1.0;
	return l;
};
haxor.math.Matrix4.Frustum = function(p_left,p_right,p_top,p_bottom,p_near,p_far,p_result) {
	var m;
	if(p_result == null) m = new haxor.math.Matrix4(); else m = p_result;
	var n2 = p_near * 2.0;
	var rml = 1.0 / (p_right - p_left);
	var tmb = 1.0 / (p_top - p_bottom);
	var fmn = 1.0 / (p_far - p_near);
	m.m00 = n2 * rml;
	m.m01 = 0.0;
	m.m02 = (p_right + p_left) * rml;
	m.m03 = 0.0;
	m.m10 = 0.0;
	m.m11 = n2 * tmb;
	m.m12 = (p_top + p_bottom) * tmb;
	m.m13 = 0.0;
	m.m20 = 0.0;
	m.m21 = 0.0;
	m.m22 = -(p_near + p_far) * fmn;
	m.m23 = -n2 * p_far * fmn;
	m.m30 = 0.0;
	m.m31 = 0.0;
	m.m32 = -1.0;
	m.m33 = 0;
	return m;
};
haxor.math.Matrix4.FrustumInverse = function(p_left,p_right,p_top,p_bottom,p_near,p_far,p_result) {
	var m;
	if(p_result == null) m = new haxor.math.Matrix4(); else m = p_result;
	var n2 = p_near * 2.0;
	var rml = p_right - p_left;
	var tmb = p_top - p_bottom;
	var fmn = p_far - p_near;
	m.m00 = rml / n2;
	m.m01 = 0.0;
	m.m02 = 0.0;
	m.m03 = (p_right + p_left) / n2;
	m.m10 = 0.0;
	m.m11 = tmb / n2;
	m.m12 = 0.0;
	m.m13 = (p_top + p_bottom) / n2;
	m.m20 = 0.0;
	m.m21 = 0.0;
	m.m22 = 0.0;
	m.m23 = -1.0;
	m.m30 = 0.0;
	m.m31 = 0.0;
	m.m32 = fmn / (-n2 * p_far);
	m.m33 = (p_far + p_near) / (n2 * p_far);
	return m;
};
haxor.math.Matrix4.Ortho = function(p_left,p_right,p_top,p_bottom,p_near,p_far,p_result) {
	var m;
	if(p_result == null) m = new haxor.math.Matrix4(); else m = p_result;
	var n2 = p_near * 2.0;
	var rml = 1.0 / (p_right - p_left);
	var tmb = 1.0 / (p_top - p_bottom);
	var fmn = 1.0 / (p_far - p_near);
	m.m00 = 2.0 * rml;
	m.m01 = 0.0;
	m.m02 = 0.0;
	m.m03 = -(p_right + p_left) * rml;
	m.m10 = 0.0;
	m.m11 = 2.0 * tmb;
	m.m12 = 0.0;
	m.m13 = -(p_top + p_bottom) * tmb;
	m.m20 = 0.0;
	m.m21 = 0.0;
	m.m22 = -2. * fmn;
	m.m23 = -(p_far + p_near) * fmn;
	m.m30 = 0.0;
	m.m31 = 0.0;
	m.m32 = 0.0;
	m.m33 = 1.0;
	return m;
};
haxor.math.Matrix4.OrthoInverse = function(p_left,p_right,p_top,p_bottom,p_near,p_far,p_result) {
	var m = haxor.context.EngineContext.data.get_m4().SetOrtho(p_left,p_right,p_top,p_bottom,p_near,p_far);
	return haxor.math.Matrix4.GetInverseTransform(m,p_result);
};
haxor.math.Matrix4.Perspective = function(p_fov,p_aspect,p_near,p_far,p_result) {
	var t = Math.tan(p_fov * 0.5 * 0.01745329251994329576923690768489) * p_near;
	var b = -t;
	var l = p_aspect * b;
	var r = p_aspect * t;
	return haxor.math.Matrix4.Frustum(l,r,t,b,p_near,p_far,p_result);
};
haxor.math.Matrix4.PerspectiveInverse = function(p_fov,p_aspect,p_near,p_far,p_result) {
	var t = Math.tan(p_fov * 0.5 * 0.01745329251994329576923690768489) * p_near;
	var b = -t;
	var l = p_aspect * b;
	var r = p_aspect * t;
	return haxor.math.Matrix4.FrustumInverse(l,r,t,b,p_near,p_far,p_result);
};
haxor.math.Matrix4.GetRotation = function(p_matrix4,p_result) {
	var m;
	if(p_result == null) m = new haxor.math.Matrix4(); else m = p_result;
	var tmp = haxor.context.EngineContext.data.get_v3();
	tmp.Set(m.m00,m.m01,m.m02).Normalize();
	m.m00 = tmp.x;
	m.m01 = tmp.y;
	m.m02 = tmp.z;
	m.m03 = 0.0;
	tmp.Set(m.m10,m.m11,m.m12).Normalize();
	m.m10 = tmp.x;
	m.m11 = tmp.y;
	m.m12 = tmp.z;
	m.m13 = 0.0;
	tmp.Set(m.m20,m.m21,m.m22).Normalize();
	m.m20 = tmp.x;
	m.m21 = tmp.y;
	m.m22 = tmp.z;
	m.m23 = 0.0;
	m.m30 = m.m31 = m.m32 = 0.0;
	m.m33 = 1.0;
	return m;
};
haxor.math.Matrix4.GetInverseTransform = function(p_matrix,p_result) {
	var result;
	if(p_result == null) result = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1); else result = p_result;
	var m = p_matrix;
	var l0x = m.m00;
	var l0y = m.m01;
	var l0z = m.m02;
	var l0w = m.m03;
	var l1x = m.m10;
	var l1y = m.m11;
	var l1z = m.m12;
	var l1w = m.m13;
	var l2x = m.m20;
	var l2y = m.m21;
	var l2z = m.m22;
	var l2w = m.m23;
	var vl0 = Math.sqrt(l0x * l0x + l1x * l1x + l2x * l2x);
	var vl1 = Math.sqrt(l0y * l0y + l1y * l1y + l2y * l2y);
	var vl2 = Math.sqrt(l0z * l0z + l1z * l1z + l2z * l2z);
	var sx;
	if((vl0 < 0?-vl0:vl0) <= 0.0001) sx = 0.0; else sx = 1.0 / vl0;
	var sy;
	if((vl1 < 0?-vl1:vl1) <= 0.0001) sy = 0.0; else sy = 1.0 / vl1;
	var sz;
	if((vl2 < 0?-vl2:vl2) <= 0.0001) sz = 0.0; else sz = 1.0 / vl2;
	l0x *= sx;
	l0y *= sy;
	l0z *= sz;
	l1x *= sx;
	l1y *= sy;
	l1z *= sz;
	l2x *= sx;
	l2y *= sy;
	l2z *= sz;
	result.Set(sx * l0x,sx * l1x,sx * l2x,sx * (l0x * -l0w + l1x * -l1w + l2x * -l2w),sy * l0y,sy * l1y,sy * l2y,sy * (l0y * -l0w + l1y * -l1w + l2y * -l2w),sz * l0z,sz * l1z,sz * l2z,sz * (l0z * -l0w + l1z * -l1w + l2z * -l2w),0,0,0,1);
	return result;
};
haxor.math.Matrix4.LookRotation = function(p_forward,p_up,p_result) {
	return haxor.math.Matrix4.LookAt(haxor.context.EngineContext.data.get_v3().Set(0,0,0),p_forward,p_up,p_result);
};
haxor.math.Matrix4.LookAt = function(p_eye,p_at,p_up,p_result) {
	if(p_result == null) p_result = new haxor.math.Matrix4(); else p_result = p_result;
	if(p_up == null) p_up = haxor.context.EngineContext.data.get_v3().Set(0,1,0); else p_up = p_up;
	var f = haxor.context.EngineContext.data.get_v3().Set3(p_at).Sub(p_eye).Normalize();
	var s = haxor.math.Vector3.Cross(f,p_up,haxor.context.EngineContext.data.get_v3()).Normalize();
	var u = haxor.math.Vector3.Cross(s,f,haxor.context.EngineContext.data.get_v3());
	p_result.m00 = s.x;
	p_result.m10 = s.y;
	p_result.m20 = s.z;
	p_result.m01 = u.x;
	p_result.m11 = u.y;
	p_result.m21 = u.z;
	p_result.m02 = -f.x;
	p_result.m12 = -f.y;
	p_result.m22 = -f.z;
	p_result.m03 = -(s.x * p_eye.x + s.y * p_eye.y + s.z * p_eye.z);
	p_result.m13 = -(u.x * p_eye.x + u.y * p_eye.y + u.z * p_eye.z);
	p_result.m23 = f.x * p_eye.x + f.y * p_eye.y + f.z * p_eye.z;
	p_result.m30 = p_result.m31 = p_result.m32 = 0.0;
	p_result.m33 = 1.0;
	return p_result;
};
haxor.math.Matrix4.Parse = function(p_data,p_delimiter) {
	if(p_delimiter == null) p_delimiter = " ";
	var tk = p_data.split(p_delimiter);
	var res = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
	var _g1 = 0;
	var _g = tk.length;
	while(_g1 < _g) {
		var i = _g1++;
		var n = Std.parseFloat(StringTools.trim(tk[i]));
		res.SetIndex(i,n);
	}
	return res;
};
haxor.math.Matrix4.prototype = {
	get_clone: function() {
		return new haxor.math.Matrix4(this.m00,this.m01,this.m02,this.m03,this.m10,this.m11,this.m12,this.m13,this.m20,this.m21,this.m22,this.m23,this.m30,this.m31,this.m32,this.m33);
	}
	,get_quaternion: function() {
		return haxor.math.Quaternion.FromMatrix4(haxor.context.EngineContext.data.get_m4().SetMatrix4(this).ToRotation());
	}
	,set_quaternion: function(v) {
		haxor.math.Matrix4.FromQuaternion(v,this);
		return v;
	}
	,get_trace: function() {
		return this.m00 + this.m11 + this.m22 + this.m33;
	}
	,get_rotation: function() {
		return new haxor.math.Matrix4(this.m00,this.m01,this.m02,this.m03,this.m10,this.m11,this.m12,this.m13,this.m20,this.m21,this.m22,this.m23,this.m30,this.m31,this.m32,this.m33).ToRotation();
	}
	,get_scale: function() {
		var d0 = Math.sqrt(this.m00 * this.m00 + this.m10 * this.m10 + this.m20 * this.m20);
		var d1 = Math.sqrt(this.m01 * this.m01 + this.m11 * this.m11 + this.m21 * this.m21);
		var d2 = Math.sqrt(this.m02 * this.m02 + this.m12 * this.m12 + this.m22 * this.m22);
		return new haxor.math.Matrix4(d0,0,0,0,0,d1,0,0,0,0,d2,0,0,0,0,1);
	}
	,get_translation: function() {
		return new haxor.math.Matrix4(1,0,0,this.m03,0,1,0,this.m13,0,0,1,this.m23,0,0,0,1);
	}
	,get_inverseTransform: function() {
		var result = new haxor.math.Matrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		var l0 = new haxor.math.Vector3(this.m00,this.m01,this.m02);
		var l1 = new haxor.math.Vector3(this.m10,this.m11,this.m12);
		var l2 = new haxor.math.Vector3(this.m20,this.m21,this.m22);
		var vl0 = Math.sqrt(l0.x * l0.x + l0.y * l0.y + l0.z * l0.z);
		var vl1 = Math.sqrt(l1.x * l1.x + l1.y * l1.y + l1.z * l1.z);
		var vl2 = Math.sqrt(l2.x * l2.x + l2.y * l2.y + l2.z * l2.z);
		var sx;
		if((vl0 < 0?-vl0:vl0) <= 0.0001) sx = 0.0; else sx = 1.0 / vl0;
		var sy;
		if((vl1 < 0?-vl1:vl1) <= 0.0001) sy = 0.0; else sy = 1.0 / vl1;
		var sz;
		if((vl2 < 0?-vl2:vl2) <= 0.0001) sz = 0.0; else sz = 1.0 / vl2;
		l0.x *= sx;
		l0.y *= sx;
		l0.z *= sx;
		l1.x *= sy;
		l1.y *= sy;
		l1.z *= sy;
		l2.x *= sz;
		l2.y *= sz;
		l2.z *= sz;
		result.Set(sx * l0.x,sx * l1.x,sx * l2.x,sx * (l0.x * -this.m03 + l1.x * -this.m13 + l2.x * -this.m23),sy * l0.y,sy * l1.y,sy * l2.y,sy * (l0.y * -this.m03 + l1.y * -this.m13 + l2.y * -this.m23),sz * l0.z,sz * l1.z,sz * l2.z,sz * (l0.z * -this.m03 + l1.z * -this.m13 + l2.z * -this.m23),0,0,0,1);
		return result;
	}
	,get_transposed: function() {
		return new haxor.math.Matrix4(this.m00,this.m10,this.m20,this.m30,this.m01,this.m11,this.m21,this.m31,this.m02,this.m12,this.m22,this.m32,this.m03,this.m13,this.m23,this.m33);
	}
	,ToRowMajor: function() {
		return [this.m00,this.m01,this.m02,this.m03,this.m10,this.m11,this.m12,this.m13,this.m20,this.m21,this.m22,this.m23,this.m30,this.m31,this.m32,this.m33];
	}
	,ToColumnMajor: function() {
		return [this.m00,this.m10,this.m20,this.m30,this.m01,this.m11,this.m21,this.m31,this.m02,this.m12,this.m22,this.m32,this.m03,this.m13,this.m23,this.m33];
	}
	,GetLine: function(p_index,p_result) {
		if(p_result == null) p_result = new haxor.math.Vector4(); else p_result = p_result;
		return p_result.Set(this.GetRowCol(p_index,0),this.GetRowCol(p_index,1),this.GetRowCol(p_index,2),this.GetRowCol(p_index,3));
	}
	,SetLine: function(p_index,p_x,p_y,p_z,p_w) {
		switch(p_index) {
		case 0:
			this.m00 = p_x;
			this.m01 = p_y;
			this.m02 = p_z;
			this.m03 = p_w;
			break;
		case 1:
			this.m10 = p_x;
			this.m11 = p_y;
			this.m12 = p_z;
			this.m13 = p_w;
			break;
		case 2:
			this.m20 = p_x;
			this.m21 = p_y;
			this.m22 = p_z;
			this.m23 = p_w;
			break;
		case 3:
			this.m30 = p_x;
			this.m31 = p_y;
			this.m32 = p_z;
			this.m33 = p_w;
			break;
		}
	}
	,GetColumn: function(p_index,p_result) {
		if(p_result == null) p_result = new haxor.math.Vector4(); else p_result = p_result;
		return p_result.Set(this.GetRowCol(0,p_index),this.GetRowCol(1,p_index),this.GetRowCol(2,p_index),this.GetRowCol(3,p_index));
	}
	,SetColumn: function(p_index,p_x,p_y,p_z,p_w) {
		switch(p_index) {
		case 0:
			this.m00 = p_x;
			this.m10 = p_y;
			this.m20 = p_z;
			this.m30 = p_w;
			break;
		case 1:
			this.m01 = p_x;
			this.m11 = p_y;
			this.m21 = p_z;
			this.m31 = p_w;
			break;
		case 2:
			this.m02 = p_x;
			this.m12 = p_y;
			this.m22 = p_z;
			this.m32 = p_w;
			break;
		case 3:
			this.m03 = p_x;
			this.m13 = p_y;
			this.m23 = p_z;
			this.m33 = p_w;
			break;
		}
	}
	,get_diagonalLR: function() {
		return new haxor.math.Vector4(this.m00,this.m11,this.m22,this.m33);
	}
	,set_diagonalLR: function(v) {
		this.m00 = v.x;
		this.m11 = v.y;
		this.m22 = v.z;
		this.m33 = v.w;
		return v;
	}
	,SetIdentity: function() {
		return this.Set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
	}
	,Set: function(p_m00,p_m01,p_m02,p_m03,p_m10,p_m11,p_m12,p_m13,p_m20,p_m21,p_m22,p_m23,p_m30,p_m31,p_m32,p_m33) {
		if(p_m33 == null) p_m33 = 0;
		if(p_m32 == null) p_m32 = 0;
		if(p_m31 == null) p_m31 = 0;
		if(p_m30 == null) p_m30 = 0;
		if(p_m23 == null) p_m23 = 0;
		if(p_m22 == null) p_m22 = 0;
		if(p_m21 == null) p_m21 = 0;
		if(p_m20 == null) p_m20 = 0;
		if(p_m13 == null) p_m13 = 0;
		if(p_m12 == null) p_m12 = 0;
		if(p_m11 == null) p_m11 = 0;
		if(p_m10 == null) p_m10 = 0;
		if(p_m03 == null) p_m03 = 0;
		if(p_m02 == null) p_m02 = 0;
		if(p_m01 == null) p_m01 = 0;
		if(p_m00 == null) p_m00 = 0;
		this.m00 = p_m00;
		this.m01 = p_m01;
		this.m02 = p_m02;
		this.m03 = p_m03;
		this.m10 = p_m10;
		this.m11 = p_m11;
		this.m12 = p_m12;
		this.m13 = p_m13;
		this.m20 = p_m20;
		this.m21 = p_m21;
		this.m22 = p_m22;
		this.m23 = p_m23;
		this.m30 = p_m30;
		this.m31 = p_m31;
		this.m32 = p_m32;
		this.m33 = p_m33;
		return this;
	}
	,SetMatrix4: function(p_matrix) {
		this.m00 = p_matrix.m00;
		this.m01 = p_matrix.m01;
		this.m02 = p_matrix.m02;
		this.m03 = p_matrix.m03;
		this.m10 = p_matrix.m10;
		this.m11 = p_matrix.m11;
		this.m12 = p_matrix.m12;
		this.m13 = p_matrix.m13;
		this.m20 = p_matrix.m20;
		this.m21 = p_matrix.m21;
		this.m22 = p_matrix.m22;
		this.m23 = p_matrix.m23;
		this.m30 = p_matrix.m30;
		this.m31 = p_matrix.m31;
		this.m32 = p_matrix.m32;
		this.m33 = p_matrix.m33;
		return this;
	}
	,GetIndex: function(p_index) {
		switch(p_index) {
		case 0:
			return this.m00;
		case 1:
			return this.m01;
		case 2:
			return this.m02;
		case 3:
			return this.m03;
		case 4:
			return this.m10;
		case 5:
			return this.m11;
		case 6:
			return this.m12;
		case 7:
			return this.m13;
		case 8:
			return this.m20;
		case 9:
			return this.m21;
		case 10:
			return this.m22;
		case 11:
			return this.m23;
		case 12:
			return this.m30;
		case 13:
			return this.m31;
		case 14:
			return this.m32;
		case 15:
			return this.m33;
		}
		return 0;
	}
	,SetIndex: function(p_index,p_value) {
		switch(p_index) {
		case 0:
			this.m00 = p_value;
			break;
		case 1:
			this.m01 = p_value;
			break;
		case 2:
			this.m02 = p_value;
			break;
		case 3:
			this.m03 = p_value;
			break;
		case 4:
			this.m10 = p_value;
			break;
		case 5:
			this.m11 = p_value;
			break;
		case 6:
			this.m12 = p_value;
			break;
		case 7:
			this.m13 = p_value;
			break;
		case 8:
			this.m20 = p_value;
			break;
		case 9:
			this.m21 = p_value;
			break;
		case 10:
			this.m22 = p_value;
			break;
		case 11:
			this.m23 = p_value;
			break;
		case 12:
			this.m30 = p_value;
			break;
		case 13:
			this.m31 = p_value;
			break;
		case 14:
			this.m32 = p_value;
			break;
		case 15:
			this.m33 = p_value;
			break;
		}
		return this;
	}
	,SetRowCol: function(p_row,p_col,p_value) {
		return this.SetIndex(p_col + (p_row << 2),p_value);
	}
	,GetRowCol: function(p_row,p_col) {
		return this.GetIndex(p_col + (p_row << 2));
	}
	,SwapCol: function(p_a,p_b) {
		var a0 = this.GetRowCol(0,p_a);
		var a1 = this.GetRowCol(1,p_a);
		var a2 = this.GetRowCol(2,p_a);
		var a3 = this.GetRowCol(3,p_a);
		this.SetRowCol(0,p_a,this.GetRowCol(0,p_b));
		this.SetRowCol(1,p_a,this.GetRowCol(1,p_b));
		this.SetRowCol(2,p_a,this.GetRowCol(2,p_b));
		this.SetRowCol(3,p_a,this.GetRowCol(3,p_b));
		this.SetRowCol(0,p_b,a0);
		this.SetRowCol(1,p_b,a1);
		this.SetRowCol(2,p_b,a2);
		this.SetRowCol(3,p_b,a3);
		return this;
	}
	,SwapRow: function(p_a,p_b) {
		var a0 = this.GetRowCol(p_a,0);
		var a1 = this.GetRowCol(p_a,1);
		var a2 = this.GetRowCol(p_a,2);
		var a3 = this.GetRowCol(p_a,3);
		this.SetRowCol(p_a,0,this.GetRowCol(p_b,0));
		this.SetRowCol(p_a,1,this.GetRowCol(p_b,1));
		this.SetRowCol(p_a,2,this.GetRowCol(p_b,2));
		this.SetRowCol(p_a,3,this.GetRowCol(p_b,3));
		this.SetRowCol(p_b,0,a0);
		this.SetRowCol(p_b,1,a1);
		this.SetRowCol(p_b,2,a2);
		this.SetRowCol(p_b,3,a3);
		return this;
	}
	,Transpose: function() {
		var t00 = this.m00;
		var t01 = this.m01;
		var t02 = this.m02;
		var t03 = this.m03;
		var t10 = this.m10;
		var t11 = this.m11;
		var t12 = this.m12;
		var t13 = this.m13;
		var t20 = this.m20;
		var t21 = this.m21;
		var t22 = this.m22;
		var t23 = this.m23;
		var t30 = this.m30;
		var t31 = this.m31;
		var t32 = this.m32;
		var t33 = this.m33;
		return this.Set(t00,t10,t20,t30,t01,t11,t21,t31,t02,t12,t22,t32,t03,t13,t23,t33);
	}
	,ToRotation: function() {
		var tmp = haxor.context.EngineContext.data.get_v3();
		tmp.Set(this.m00,this.m01,this.m02).Normalize();
		this.m00 = tmp.x;
		this.m01 = tmp.y;
		this.m02 = tmp.z;
		this.m03 = 0.0;
		tmp.Set(this.m10,this.m11,this.m12).Normalize();
		this.m10 = tmp.x;
		this.m11 = tmp.y;
		this.m12 = tmp.z;
		this.m13 = 0.0;
		tmp.Set(this.m20,this.m21,this.m22).Normalize();
		this.m20 = tmp.x;
		this.m21 = tmp.y;
		this.m22 = tmp.z;
		this.m23 = 0.0;
		this.m30 = this.m31 = this.m32 = 0.0;
		this.m33 = 1.0;
		return this;
	}
	,Rotate: function(p_vector) {
		var tmp = haxor.context.EngineContext.data.get_v3();
		tmp.Set(this.m00,this.m01,this.m02).Normalize();
		p_vector.x = tmp.x * p_vector.x + tmp.y * p_vector.y + tmp.z * p_vector.z;
		tmp.Set(this.m10,this.m11,this.m12).Normalize();
		p_vector.y = tmp.x * p_vector.x + tmp.y * p_vector.y + tmp.z * p_vector.z;
		tmp.Set(this.m20,this.m21,this.m22).Normalize();
		p_vector.z = tmp.x * p_vector.x + tmp.y * p_vector.y + tmp.z * p_vector.z;
		return p_vector;
	}
	,SetTRS: function(p_position,p_rotation,p_scale) {
		return haxor.math.Matrix4.TRS(p_position,p_rotation,p_scale,this);
	}
	,MultiplyTransform: function(p_matrix) {
		var r00 = this.m00 * p_matrix.m00 + this.m01 * p_matrix.m10 + this.m02 * p_matrix.m20;
		var r01 = this.m00 * p_matrix.m01 + this.m01 * p_matrix.m11 + this.m02 * p_matrix.m21;
		var r02 = this.m00 * p_matrix.m02 + this.m01 * p_matrix.m12 + this.m02 * p_matrix.m22;
		var r03 = this.m00 * p_matrix.m03 + this.m01 * p_matrix.m13 + this.m02 * p_matrix.m23 + this.m03;
		var r10 = this.m10 * p_matrix.m00 + this.m11 * p_matrix.m10 + this.m12 * p_matrix.m20;
		var r11 = this.m10 * p_matrix.m01 + this.m11 * p_matrix.m11 + this.m12 * p_matrix.m21;
		var r12 = this.m10 * p_matrix.m02 + this.m11 * p_matrix.m12 + this.m12 * p_matrix.m22;
		var r13 = this.m10 * p_matrix.m03 + this.m11 * p_matrix.m13 + this.m12 * p_matrix.m23 + this.m13;
		var r20 = this.m20 * p_matrix.m00 + this.m21 * p_matrix.m10 + this.m22 * p_matrix.m20;
		var r21 = this.m20 * p_matrix.m01 + this.m21 * p_matrix.m11 + this.m22 * p_matrix.m21;
		var r22 = this.m20 * p_matrix.m02 + this.m21 * p_matrix.m12 + this.m22 * p_matrix.m22;
		var r23 = this.m20 * p_matrix.m03 + this.m21 * p_matrix.m13 + this.m22 * p_matrix.m23 + this.m23;
		this.Set(r00,r01,r02,r03,r10,r11,r12,r13,r20,r21,r22,r23,0,0,0,1);
		return this;
	}
	,Multiply3x4: function(p_matrix) {
		var r00 = this.m00 * p_matrix.m00 + this.m01 * p_matrix.m10 + this.m02 * p_matrix.m20 + this.m03 * p_matrix.m30;
		var r01 = this.m00 * p_matrix.m01 + this.m01 * p_matrix.m11 + this.m02 * p_matrix.m21 + this.m03 * p_matrix.m31;
		var r02 = this.m00 * p_matrix.m02 + this.m01 * p_matrix.m12 + this.m02 * p_matrix.m22 + this.m03 * p_matrix.m32;
		var r03 = this.m00 * p_matrix.m03 + this.m01 * p_matrix.m13 + this.m02 * p_matrix.m23 + this.m03 * p_matrix.m33;
		var r10 = this.m10 * p_matrix.m00 + this.m11 * p_matrix.m10 + this.m12 * p_matrix.m20 + this.m13 * p_matrix.m30;
		var r11 = this.m10 * p_matrix.m01 + this.m11 * p_matrix.m11 + this.m12 * p_matrix.m21 + this.m13 * p_matrix.m31;
		var r12 = this.m10 * p_matrix.m02 + this.m11 * p_matrix.m12 + this.m12 * p_matrix.m22 + this.m13 * p_matrix.m32;
		var r13 = this.m10 * p_matrix.m03 + this.m11 * p_matrix.m13 + this.m12 * p_matrix.m23 + this.m13 * p_matrix.m33;
		var r20 = this.m20 * p_matrix.m00 + this.m21 * p_matrix.m10 + this.m22 * p_matrix.m20 + this.m23 * p_matrix.m30;
		var r21 = this.m20 * p_matrix.m01 + this.m21 * p_matrix.m11 + this.m22 * p_matrix.m21 + this.m23 * p_matrix.m31;
		var r22 = this.m20 * p_matrix.m02 + this.m21 * p_matrix.m12 + this.m22 * p_matrix.m22 + this.m23 * p_matrix.m32;
		var r23 = this.m20 * p_matrix.m03 + this.m21 * p_matrix.m13 + this.m22 * p_matrix.m23 + this.m23 * p_matrix.m33;
		this.Set(r00,r01,r02,r03,r10,r11,r12,r13,r20,r21,r22,r23,this.m30,this.m31,this.m32,this.m33);
		return this;
	}
	,Multiply: function(p_matrix) {
		var r00 = this.m00 * p_matrix.m00 + this.m01 * p_matrix.m10 + this.m02 * p_matrix.m20 + this.m03 * p_matrix.m30;
		var r01 = this.m00 * p_matrix.m01 + this.m01 * p_matrix.m11 + this.m02 * p_matrix.m21 + this.m03 * p_matrix.m31;
		var r02 = this.m00 * p_matrix.m02 + this.m01 * p_matrix.m12 + this.m02 * p_matrix.m22 + this.m03 * p_matrix.m32;
		var r03 = this.m00 * p_matrix.m03 + this.m01 * p_matrix.m13 + this.m02 * p_matrix.m23 + this.m03 * p_matrix.m33;
		var r10 = this.m10 * p_matrix.m00 + this.m11 * p_matrix.m10 + this.m12 * p_matrix.m20 + this.m13 * p_matrix.m30;
		var r11 = this.m10 * p_matrix.m01 + this.m11 * p_matrix.m11 + this.m12 * p_matrix.m21 + this.m13 * p_matrix.m31;
		var r12 = this.m10 * p_matrix.m02 + this.m11 * p_matrix.m12 + this.m12 * p_matrix.m22 + this.m13 * p_matrix.m32;
		var r13 = this.m10 * p_matrix.m03 + this.m11 * p_matrix.m13 + this.m12 * p_matrix.m23 + this.m13 * p_matrix.m33;
		var r20 = this.m20 * p_matrix.m00 + this.m21 * p_matrix.m10 + this.m22 * p_matrix.m20 + this.m23 * p_matrix.m30;
		var r21 = this.m20 * p_matrix.m01 + this.m21 * p_matrix.m11 + this.m22 * p_matrix.m21 + this.m23 * p_matrix.m31;
		var r22 = this.m20 * p_matrix.m02 + this.m21 * p_matrix.m12 + this.m22 * p_matrix.m22 + this.m23 * p_matrix.m32;
		var r23 = this.m20 * p_matrix.m03 + this.m21 * p_matrix.m13 + this.m22 * p_matrix.m23 + this.m23 * p_matrix.m33;
		var r30 = this.m30 * p_matrix.m00 + this.m31 * p_matrix.m10 + this.m32 * p_matrix.m20 + this.m33 * p_matrix.m30;
		var r31 = this.m30 * p_matrix.m01 + this.m31 * p_matrix.m11 + this.m32 * p_matrix.m21 + this.m33 * p_matrix.m31;
		var r32 = this.m30 * p_matrix.m02 + this.m31 * p_matrix.m12 + this.m32 * p_matrix.m22 + this.m33 * p_matrix.m32;
		var r33 = this.m30 * p_matrix.m03 + this.m31 * p_matrix.m13 + this.m32 * p_matrix.m23 + this.m33 * p_matrix.m33;
		this.Set(r00,r01,r02,r03,r10,r11,r12,r13,r20,r21,r22,r23,r30,r31,r32,r33);
		return this;
	}
	,Transform4x4: function(p_point) {
		var vx = this.m00 * p_point.x + this.m01 * p_point.y + this.m02 * p_point.z + this.m03 * p_point.w;
		var vy = this.m10 * p_point.x + this.m11 * p_point.y + this.m12 * p_point.z + this.m13 * p_point.w;
		var vz = this.m20 * p_point.x + this.m21 * p_point.y + this.m22 * p_point.z + this.m23 * p_point.w;
		var vw = this.m30 * p_point.x + this.m31 * p_point.y + this.m32 * p_point.z + this.m33 * p_point.w;
		p_point.x = vx;
		p_point.y = vy;
		p_point.z = vz;
		p_point.w = vw;
		return p_point;
	}
	,Transform3x4: function(p_point) {
		var vx = this.m00 * p_point.x + this.m01 * p_point.y + this.m02 * p_point.z + this.m03;
		var vy = this.m10 * p_point.x + this.m11 * p_point.y + this.m12 * p_point.z + this.m13;
		var vz = this.m20 * p_point.x + this.m21 * p_point.y + this.m22 * p_point.z + this.m23;
		p_point.x = vx;
		p_point.y = vy;
		p_point.z = vz;
		return p_point;
	}
	,Transform3x3: function(p_point) {
		var vx = this.m00 * p_point.x + this.m01 * p_point.y + this.m02 * p_point.z;
		var vy = this.m10 * p_point.x + this.m11 * p_point.y + this.m12 * p_point.z;
		var vz = this.m20 * p_point.x + this.m21 * p_point.y + this.m22 * p_point.z;
		p_point.x = vx;
		p_point.y = vy;
		p_point.z = vz;
		return p_point;
	}
	,Transform2x3: function(p_point) {
		var vx = this.m00 * p_point.x + this.m01 * p_point.y + this.m03;
		var vy = this.m10 * p_point.x + this.m11 * p_point.y + this.m13;
		p_point.x = vx;
		p_point.y = vy;
	}
	,Transform2x2: function(p_point) {
		var vx = this.m00 * p_point.x + this.m01 * p_point.y;
		var vy = this.m10 * p_point.x + this.m11 * p_point.y;
		p_point.x = vx;
		p_point.y = vy;
	}
	,SetLookAt: function(p_eye,p_at,p_up) {
		return haxor.math.Matrix4.LookAt(p_eye,p_at,p_up,this);
	}
	,SetFrustum: function(p_left,p_right,p_top,p_bottom,p_near,p_far) {
		return haxor.math.Matrix4.Frustum(p_left,p_right,p_top,p_bottom,p_near,p_far,this);
	}
	,SetFrustumInverse: function(p_left,p_right,p_top,p_bottom,p_near,p_far) {
		return haxor.math.Matrix4.FrustumInverse(p_left,p_right,p_top,p_bottom,p_near,p_far,this);
	}
	,SetOrtho: function(p_left,p_right,p_top,p_bottom,p_near,p_far) {
		return haxor.math.Matrix4.Ortho(p_left,p_right,p_top,p_bottom,p_near,p_far,this);
	}
	,SetPerspective: function(p_fov,p_aspect,p_near,p_far) {
		return haxor.math.Matrix4.Perspective(p_fov,p_aspect,p_near,p_far,this);
	}
	,SetPerspectiveInverse: function(p_fov,p_aspect,p_near,p_far) {
		return haxor.math.Matrix4.PerspectiveInverse(p_fov,p_aspect,p_near,p_far,this);
	}
	,ToArray: function() {
		return [this.m00,this.m01,this.m02,this.m03,this.m10,this.m11,this.m12,this.m13,this.m20,this.m21,this.m22,this.m23,this.m30,this.m31,this.m32,this.m33];
	}
	,ToString: function(p_linear,p_places) {
		if(p_places == null) p_places = 2;
		if(p_linear == null) p_linear = true;
		var a = this.ToArray();
		var s = [];
		var _g1 = 0;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			a[i] = haxor.math.Mathf.RoundPlaces(a[i],p_places);
			s.push(a[i] >= 0?" " + a[i]:a[i] + "");
		}
		var res;
		if(p_linear) res = "["; else res = "";
		var _g2 = 0;
		while(_g2 < 4) {
			var i1 = _g2++;
			var _g11 = 0;
			while(_g11 < 4) {
				var j = _g11++;
				res += s[j + i1 * 4] + (j < 3?",":"");
			}
			if(i1 == 3) res += ""; else if(p_linear) res += " |"; else res += "\n";
		}
		if(p_linear) res += "]";
		return res;
	}
	,__class__: haxor.math.Matrix4
};
haxor.math.Quaternion = function(p_x,p_y,p_z,p_w) {
	if(p_w == null) p_w = 1.0;
	if(p_z == null) p_z = 0;
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.x = p_x;
	this.y = p_y;
	this.z = p_z;
	this.w = p_w;
};
$hxClasses["haxor.math.Quaternion"] = haxor.math.Quaternion;
haxor.math.Quaternion.__name__ = ["haxor","math","Quaternion"];
haxor.math.Quaternion.get_temp = function() {
	return haxor.context.EngineContext.data.get_q();
};
haxor.math.Quaternion.get_identity = function() {
	return new haxor.math.Quaternion(0,0,0,1.0);
};
haxor.math.Quaternion.FromEuler = function(p_euler,p_result) {
	var r;
	if(p_result == null) r = new haxor.math.Quaternion(); else r = p_result;
	var c = haxor.context.EngineContext.data.get_v3();
	var s = haxor.context.EngineContext.data.get_v3();
	var k = 0.0087266462599716477;
	var e = haxor.context.EngineContext.data.get_v3().Set(p_euler.x * k,p_euler.y * k,p_euler.z * k);
	c.Set(Math.cos(e.x),Math.cos(e.y),Math.cos(e.z));
	s.Set(Math.sin(e.x),Math.sin(e.y),Math.sin(e.z));
	r.x = s.x * c.y * c.z - c.x * s.y * s.z;
	r.y = c.x * s.y * c.z + s.x * c.y * s.z;
	r.z = c.x * c.y * s.z - s.x * s.y * c.z;
	r.w = c.x * c.y * c.z + s.x * s.y * s.z;
	return r;
};
haxor.math.Quaternion.ToEuler = function(p_quaternion,p_result) {
	var q = p_quaternion;
	var r;
	if(p_result == null) r = new haxor.math.Vector3(); else r = p_result;
	var test = q.x * q.y + q.z * q.w;
	if(test > 0.499) {
		r.y = 2 * Math.atan2(q.x,q.w) * 57.295779513082320876798154814105;
		r.z = Math.PI * 0.5 * 57.295779513082320876798154814105;
		r.x = 0;
		return r;
	}
	if(test < -0.499) {
		r.y = -2. * Math.atan2(q.x,q.w);
		r.z = -Math.PI * 0.5 * 57.295779513082320876798154814105;
		r.x = 0;
		return r;
	}
	var sqx = q.x * q.x;
	var sqy = q.y * q.y;
	var sqz = q.z * q.z;
	r.y = Math.atan2(2.0 * q.y * q.w - 2.0 * q.x * q.z,1.0 - 2.0 * sqy - 2.0 * sqz) * 57.295779513082320876798154814105;
	r.z = Math.asin(2.0 * test) * 57.295779513082320876798154814105;
	r.x = Math.atan2(2.0 * q.x * q.w - 2.0 * q.y * q.z,1.0 - 2.0 * sqx - 2.0 * sqz) * 57.295779513082320876798154814105;
	return r;
};
haxor.math.Quaternion.FromMatrix4 = function(p_matrix,p_result) {
	var r;
	if(p_result == null) r = new haxor.math.Quaternion(); else r = p_result;
	var v = p_matrix;
	var fourXSquaredMinus1 = v.m00 - v.m11 - v.m22;
	var fourYSquaredMinus1 = v.m11 - v.m00 - v.m22;
	var fourZSquaredMinus1 = v.m22 - v.m00 - v.m11;
	var fourWSquaredMinus1 = v.m00 + v.m11 + v.m22;
	var biggestIndex = 0;
	var fourBiggestSquaredMinus1 = fourWSquaredMinus1;
	if(fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
		fourBiggestSquaredMinus1 = fourXSquaredMinus1;
		biggestIndex = 1;
	}
	if(fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
		fourBiggestSquaredMinus1 = fourYSquaredMinus1;
		biggestIndex = 2;
	}
	if(fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
		fourBiggestSquaredMinus1 = fourZSquaredMinus1;
		biggestIndex = 3;
	}
	var biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1.0) * 0.5;
	var mult = 0.25 / biggestVal;
	switch(biggestIndex) {
	case 0:
		r.w = biggestVal;
		r.x = (v.m21 - v.m12) * mult;
		r.y = (v.m02 - v.m20) * mult;
		r.z = (v.m10 - v.m01) * mult;
		break;
	case 1:
		r.w = (v.m21 - v.m12) * mult;
		r.x = biggestVal;
		r.y = (v.m10 + v.m01) * mult;
		r.z = (v.m02 + v.m20) * mult;
		break;
	case 2:
		r.w = (v.m02 - v.m20) * mult;
		r.x = (v.m10 + v.m01) * mult;
		r.y = biggestVal;
		r.z = (v.m21 + v.m12) * mult;
		break;
	case 3:
		r.w = (v.m10 - v.m01) * mult;
		r.x = (v.m02 + v.m20) * mult;
		r.y = (v.m21 + v.m12) * mult;
		r.z = biggestVal;
		break;
	}
	return r;
};
haxor.math.Quaternion.Dot = function(p_a,p_b) {
	return p_a.x * p_b.x + p_a.y * p_b.y + p_a.z * p_b.z + p_a.w * p_b.w;
};
haxor.math.Quaternion.DeltaRotation = function(p_a,p_b,p_result) {
	var r;
	if(p_result == null) r = new haxor.math.Quaternion(); else r = p_result;
	haxor.math.Quaternion.Inverse(p_a,r);
	r.Multiply(p_b);
	return r;
};
haxor.math.Quaternion.Inverse = function(p_q,p_result) {
	var d = p_q.x * p_q.x + p_q.y * p_q.y + p_q.z * p_q.z + p_q.w * p_q.w;
	if(d <= 0.0) d = 0.0; else d = 1.0 / d;
	var r;
	if(p_result == null) r = new haxor.math.Quaternion(); else r = p_result;
	return r.Set(-p_q.x * d,-p_q.y * d,-p_q.z * d,p_q.w * d);
};
haxor.math.Quaternion.Lerp = function(p_a,p_b,p_ratio,p_result) {
	var c;
	if(p_result == null) c = new haxor.math.Quaternion(); else c = p_result;
	var ca = new haxor.math.Quaternion(p_a.x,p_a.y,p_a.z,p_a.w);
	var dot = p_a.x * p_b.x + p_a.y * p_b.y + p_a.z * p_b.z + p_a.w * p_b.w;
	if(dot < 0.0) {
		ca.w = -ca.w;
		ca.x = -ca.x;
		ca.y = -ca.y;
		ca.z = -ca.z;
	}
	c.x = ca.x + (p_b.x - ca.x) * p_ratio;
	c.y = ca.y + (p_b.y - ca.y) * p_ratio;
	c.z = ca.z + (p_b.z - ca.z) * p_ratio;
	c.w = ca.w + (p_b.w - ca.w) * p_ratio;
	c.Normalize();
	return c;
};
haxor.math.Quaternion.Slerp = function(p_a,p_b,p_ratio) {
	var qm = new haxor.math.Quaternion();
	var z = haxor.context.EngineContext.data.get_q().SetQuaternion(p_b);
	var cosTheta = p_a.x * p_b.x + p_a.y * p_b.y + p_a.z * p_b.z + p_a.w * p_b.w;
	if(cosTheta < 0.0) {
		z.Invert();
		cosTheta = -cosTheta;
	}
	if(cosTheta > 0.9999) qm.Set(haxor.math.Mathf.Lerp(p_a.x,z.x,p_ratio),haxor.math.Mathf.Lerp(p_a.y,z.y,p_ratio),haxor.math.Mathf.Lerp(p_a.z,z.z,p_ratio),haxor.math.Mathf.Lerp(p_a.w,z.w,p_ratio)); else {
		var angle = Math.acos(cosTheta);
		var s = 1.0 / Math.sin(angle);
		var s0 = Math.sin((1.0 - p_ratio) * angle);
		var s1 = Math.sin(p_ratio * angle);
		qm.x = (s0 * p_a.x + s1 * z.x) * s;
		qm.y = (s0 * p_a.y + s1 * z.y) * s;
		qm.z = (s0 * p_a.z + s1 * z.z) * s;
		qm.w = (s0 * p_a.w + s1 * z.w) * s;
	}
	return qm;
};
haxor.math.Quaternion.FromAxisAngle = function(p_axis,p_angle) {
	p_angle = p_angle * 0.5 * 0.01745329251994329576923690768489;
	var l = Math.sqrt(p_axis.x * p_axis.x + p_axis.y * p_axis.y + p_axis.z * p_axis.z);
	if(haxor.math.Mathf.Abs(l - 1.0) > 0.0001) p_axis.Normalize();
	var s = Math.sin(p_angle);
	return new haxor.math.Quaternion(p_axis.x * s,p_axis.y * s,p_axis.z * s,Math.cos(p_angle));
};
haxor.math.Quaternion.LookAt = function(p_eye,p_at,p_up,p_result) {
	return haxor.math.Quaternion.FromMatrix4(haxor.math.Matrix4.LookAt(p_eye,p_at,p_up,haxor.context.EngineContext.data.get_m4()),p_result);
};
haxor.math.Quaternion.LookRotation = function(p_forward,p_up) {
	return haxor.math.Matrix4.LookRotation(p_forward,p_up,haxor.context.EngineContext.data.get_m4()).get_quaternion();
};
haxor.math.Quaternion.Parse = function(p_data,p_delimiter) {
	if(p_delimiter == null) p_delimiter = " ";
	var tk = p_data.split(p_delimiter);
	return new haxor.math.Quaternion(0,0,0,1.0).Set(Std.parseFloat(StringTools.trim(tk[0])),Std.parseFloat(StringTools.trim(tk[1])),Std.parseFloat(StringTools.trim(tk[2])),Std.parseFloat(StringTools.trim(tk[3])));
};
haxor.math.Quaternion.prototype = {
	get_matrix: function() {
		return haxor.math.Matrix4.FromQuaternion(this);
	}
	,set_matrix: function(v) {
		haxor.math.Quaternion.FromMatrix4(v,this);
		return v;
	}
	,get_euler: function() {
		return haxor.math.Quaternion.ToEuler(this);
	}
	,set_euler: function(v) {
		haxor.math.Quaternion.FromEuler(v,this);
		return v;
	}
	,get_clone: function() {
		return new haxor.math.Quaternion(this.x,this.y,this.z,this.w);
	}
	,get_xyzw: function() {
		return new haxor.math.Vector4(this.x,this.y,this.z,this.w);
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	,get_normalized: function() {
		return new haxor.math.Quaternion(this.x,this.y,this.z,this.w).Normalize();
	}
	,Set: function(p_x,p_y,p_z,p_w) {
		if(p_w == null) p_w = 1.0;
		if(p_z == null) p_z = 0;
		if(p_y == null) p_y = 0;
		if(p_x == null) p_x = 0;
		this.x = p_x;
		this.y = p_y;
		this.z = p_z;
		this.w = p_w;
		return this;
	}
	,SetQuaternion: function(p_q) {
		this.x = p_q.x;
		this.y = p_q.y;
		this.z = p_q.z;
		this.w = p_q.w;
		return this;
	}
	,Normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		if(l <= 0) {
			this.x = this.y = this.z = 0.0;
			this.w = 1.0;
			return this;
		}
		this.x *= l = 1.0 / l;
		this.y *= l;
		this.z *= l;
		this.w *= l;
		return this;
	}
	,get_conjugate: function() {
		return new haxor.math.Quaternion(-this.x,-this.y,-this.z,this.w);
	}
	,get_inverse: function() {
		return haxor.math.Quaternion.Inverse(this);
	}
	,Invert: function() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;
		return this;
	}
	,Scale: function(p_v) {
		this.x *= p_v;
		this.y *= p_v;
		this.z *= p_v;
		this.w *= p_v;
		return this;
	}
	,Multiply: function(p_v,p_normalize) {
		if(p_normalize == null) p_normalize = false;
		var vx = this.w * p_v.x + this.x * p_v.w + this.y * p_v.z - this.z * p_v.y;
		var vy = this.w * p_v.y + this.y * p_v.w + this.z * p_v.x - this.x * p_v.z;
		var vz = this.w * p_v.z + this.z * p_v.w + this.x * p_v.y - this.y * p_v.x;
		var vw = this.w * p_v.w - this.x * p_v.x - this.y * p_v.y - this.z * p_v.z;
		this.x = vx;
		this.y = vy;
		this.z = vz;
		this.w = vw;
		if(p_normalize) return this.Normalize(); else return this;
	}
	,Transform: function(p_v) {
		var l = Math.sqrt(p_v.x * p_v.x + p_v.y * p_v.y + p_v.z * p_v.z);
		var nl;
		if(l <= 0.0) nl = 0.0; else nl = 1.0 / l;
		p_v.x *= nl;
		p_v.y *= nl;
		p_v.z *= nl;
		var qv = haxor.context.EngineContext.data.get_q().Set(p_v.x,p_v.y,p_v.z,0);
		var a = haxor.context.EngineContext.data.get_q().SetQuaternion(this);
		var c = haxor.context.EngineContext.data.get_q().Set(-this.x,-this.y,-this.z,this.w);
		a.Multiply(qv.Multiply(c));
		p_v.x = a.x * l;
		p_v.y = a.y * l;
		p_v.z = a.z * l;
		return p_v;
	}
	,Delta: function(p_q) {
		return this.SetQuaternion(haxor.math.Quaternion.DeltaRotation(this,p_q,haxor.context.EngineContext.data.get_q()));
	}
	,SetAxisAngle: function(p_axis,p_angle) {
		p_angle = p_angle * 0.5 * 0.01745329251994329576923690768489;
		var l = Math.sqrt(p_axis.x * p_axis.x + p_axis.y * p_axis.y + p_axis.z * p_axis.z);
		if(haxor.math.Mathf.Abs(l - 1.0) > 0.0001) p_axis.Normalize();
		var s = Math.sin(p_angle);
		return this.Set(p_axis.x * s,p_axis.y * s,p_axis.z * s,Math.cos(p_angle));
	}
	,ToArray: function() {
		return [this.x,this.y,this.z,this.w];
	}
	,ToString: function(p_places) {
		if(p_places == null) p_places = 2;
		return "[" + haxor.math.Mathf.RoundPlaces(this.x,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.y,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.z,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.w,p_places) + "]";
	}
	,__class__: haxor.math.Quaternion
};
haxor.math.Random = function() { };
$hxClasses["haxor.math.Random"] = haxor.math.Random;
haxor.math.Random.__name__ = ["haxor","math","Random"];
haxor.math.Random.get_value = function() {
	return Math.random();
};
haxor.math.Random.get_interval = function() {
	return (Math.random() - 0.499995) * 2.0;
};
haxor.math.Random.get_rotation = function() {
	return haxor.math.Quaternion.FromAxisAngle(new haxor.math.Vector3((Math.random() - 0.499995) * 2.0,(Math.random() - 0.499995) * 2.0,(Math.random() - 0.499995) * 2.0).Normalize().Scale(Math.random()),(Math.random() - 0.499995) * 2.0 * 180.0);
};
haxor.math.Random.get_box = function() {
	return new haxor.math.Vector3((Math.random() - 0.499995) * 2.0 * 0.5,(Math.random() - 0.499995) * 2.0 * 0.5,(Math.random() - 0.499995) * 2.0 * 0.5);
};
haxor.math.Random.get_onBox = function() {
	var p = new haxor.math.Vector3((Math.random() - 0.499995) * 2.0 * 0.5,(Math.random() - 0.499995) * 2.0 * 0.5,(Math.random() - 0.499995) * 2.0 * 0.5);
	var i = Math.random() * 3 + 0.5;
	switch(i) {
	case 0:
		if(p.x < 0.0) p.x = -0.5; else p.x = 0.5;
		break;
	case 1:
		if(p.y < 0.0) p.y = -0.5; else p.y = 0.5;
		break;
	case 2:
		if(p.z < 0.0) p.z = -0.5; else p.z = 0.5;
		break;
	}
	return p;
};
haxor.math.Random.get_square = function() {
	return new haxor.math.Vector2((Math.random() - 0.499995) * 2.0 * 0.5,(Math.random() - 0.499995) * 2.0 * 0.5);
};
haxor.math.Random.get_onSquare = function() {
	var p = new haxor.math.Vector2((Math.random() - 0.499995) * 2.0 * 0.5,(Math.random() - 0.499995) * 2.0 * 0.5);
	var i = Math.random() * 2 + 0.5;
	switch(i) {
	case 0:
		if(p.x < 0.0) p.x = -0.5; else p.x = 0.5;
		break;
	case 1:
		if(p.y < 0.0) p.y = -0.5; else p.y = 0.5;
		break;
	}
	return p;
};
haxor.math.Random.get_sphere = function() {
	return new haxor.math.Vector3((Math.random() - 0.499995) * 2.0,(Math.random() - 0.499995) * 2.0,(Math.random() - 0.499995) * 2.0).Normalize().Scale(Math.random());
};
haxor.math.Random.get_onSphere = function() {
	return new haxor.math.Vector3((Math.random() - 0.499995) * 2.0,(Math.random() - 0.499995) * 2.0,(Math.random() - 0.499995) * 2.0).Normalize();
};
haxor.math.Random.get_circle = function() {
	return new haxor.math.Vector2((Math.random() - 0.499995) * 2.0,(Math.random() - 0.499995) * 2.0).Normalize().Scale(Math.random());
};
haxor.math.Random.get_onCircle = function() {
	return new haxor.math.Vector2((Math.random() - 0.499995) * 2.0,(Math.random() - 0.499995) * 2.0).Normalize();
};
haxor.math.Random.Length = function(v) {
	return (v + 1) * Math.random();
};
haxor.math.Random.Range = function(p_min,p_max) {
	return haxor.math.Mathf.Lerp(p_min,p_max,Math.random());
};
haxor.math.Random.RangeInt = function(p_min,p_max) {
	return haxor.math.Mathf.LerpInt(p_min,p_max + 1,Math.random());
};
haxor.math.Random.Item = function(p_list) {
	return p_list[p_list.length * Math.random()];
};
haxor.math.Random.Shuffle = function(p_list) {
	var m = p_list.length;
	var t;
	var i;
	while(m > 0) {
		i = Math.floor(Math.random() * m--);
		t = p_list[m];
		p_list[m] = p_list[i];
		p_list[i] = t;
	}
};
haxor.math.Vector2 = function(p_x,p_y) {
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.x = p_x;
	this.y = p_y;
};
$hxClasses["haxor.math.Vector2"] = haxor.math.Vector2;
haxor.math.Vector2.__name__ = ["haxor","math","Vector2"];
haxor.math.Vector2.get_temp = function() {
	return haxor.context.EngineContext.data.get_v2();
};
haxor.math.Vector2.get_zero = function() {
	return new haxor.math.Vector2(0,0);
};
haxor.math.Vector2.get_one = function() {
	return new haxor.math.Vector2(1,1);
};
haxor.math.Vector2.get_right = function() {
	return new haxor.math.Vector2(1,0);
};
haxor.math.Vector2.get_up = function() {
	return new haxor.math.Vector2(0,1);
};
haxor.math.Vector2.Dot = function(p_a,p_b) {
	return p_a.x * p_b.x + p_a.y * p_b.y;
};
haxor.math.Vector2.Lerp = function(p_a,p_b,p_r) {
	return new haxor.math.Vector2(p_a.x + (p_b.x - p_a.x) * p_r,p_a.y + (p_b.y - p_a.y) * p_r);
};
haxor.math.Vector2.Parse = function(p_data,p_delimiter) {
	if(p_delimiter == null) p_delimiter = " ";
	var tk = p_data.split(p_delimiter);
	return new haxor.math.Vector2(0,0).Set(Std.parseFloat(StringTools.trim(tk[0])),Std.parseFloat(StringTools.trim(tk[1])));
};
haxor.math.Vector2.prototype = {
	get_clone: function() {
		return new haxor.math.Vector2(this.x,this.y);
	}
	,get_xy: function() {
		return new haxor.math.Vector2(this.x,this.y);
	}
	,get_yx: function() {
		return new haxor.math.Vector2(this.y,this.x);
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,get_lengthSqr: function() {
		return this.x * this.x + this.y * this.y;
	}
	,get_normalized: function() {
		return new haxor.math.Vector2(this.x,this.y).Normalize();
	}
	,get_inverse: function() {
		return new haxor.math.Vector2(this.x,this.y).Invert();
	}
	,Set: function(p_x,p_y) {
		if(p_y == null) p_y = 0;
		if(p_x == null) p_x = 0;
		this.x = p_x;
		this.y = p_y;
		return this;
	}
	,Set2: function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	,Set3: function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	,Set4: function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	,Get: function(p) {
		if(p == 0) return this.x; else return this.y;
	}
	,Add: function(p_v) {
		this.x += p_v.x;
		this.y += p_v.y;
		return this;
	}
	,Sub: function(p_v) {
		this.x -= p_v.x;
		this.y -= p_v.y;
		return this;
	}
	,Multiply: function(p_v) {
		this.x *= p_v.x;
		this.y *= p_v.y;
		return this;
	}
	,Scale: function(p_s) {
		this.x *= p_s;
		this.y *= p_s;
		return this;
	}
	,Step: function(p_to,p_step) {
		var vx = p_to.x - this.x;
		var vy = p_to.y - this.y;
		var l = Math.sqrt(vx * vx + vy * vy);
		if(l <= 0.0001) return false;
		var s;
		if(p_step > l) s = l; else s = p_step;
		l = s / l;
		vx *= l;
		vy *= l;
		this.x += vx;
		this.y += vy;
		return true;
	}
	,Reflect: function(p_normal) {
		var d = Math.min(0.0,p_normal.x * this.x + p_normal.y * this.y) * 2.0;
		this.x += -p_normal.x * d;
		this.y += -p_normal.y * d;
		return this;
	}
	,Invert: function() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}
	,Normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y);
		if(l <= 0) return this;
		this.x *= l = 1.0 / l;
		this.y *= l;
		return this;
	}
	,ToArray: function() {
		return [this.x,this.y];
	}
	,ToString: function(p_places) {
		if(p_places == null) p_places = 2;
		return "[" + haxor.math.Mathf.RoundPlaces(this.x,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.y,p_places) + "]";
	}
	,__class__: haxor.math.Vector2
};
haxor.math.Vector3 = function(p_x,p_y,p_z) {
	if(p_z == null) p_z = 0;
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.x = p_x;
	this.y = p_y;
	this.z = p_z;
};
$hxClasses["haxor.math.Vector3"] = haxor.math.Vector3;
haxor.math.Vector3.__name__ = ["haxor","math","Vector3"];
haxor.math.Vector3.get_temp = function() {
	return haxor.context.EngineContext.data.get_v3();
};
haxor.math.Vector3.get_zero = function() {
	return new haxor.math.Vector3(0,0,0);
};
haxor.math.Vector3.get_one = function() {
	return new haxor.math.Vector3(1,1,1);
};
haxor.math.Vector3.get_right = function() {
	return new haxor.math.Vector3(1,0,0);
};
haxor.math.Vector3.get_up = function() {
	return new haxor.math.Vector3(0,1,0);
};
haxor.math.Vector3.get_forward = function() {
	return new haxor.math.Vector3(0,0,1);
};
haxor.math.Vector3.Dot = function(p_a,p_b) {
	return p_a.x * p_b.x + p_a.y * p_b.y + p_a.z * p_b.z;
};
haxor.math.Vector3.Distance = function(p_a,p_b) {
	var dx = p_a.x - p_b.x;
	var dy = p_a.y - p_b.y;
	var dz = p_a.z - p_b.z;
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
haxor.math.Vector3.Cross = function(p_a,p_b,p_result) {
	if(p_result == null) p_result = new haxor.math.Vector3(); else p_result = p_result;
	return p_result.Set(p_a.y * p_b.z - p_a.z * p_b.y,p_a.z * p_b.x - p_a.x * p_b.z,p_a.x * p_b.y - p_a.y * p_b.x);
};
haxor.math.Vector3.Lerp = function(p_a,p_b,p_r,p_result) {
	if(p_result == null) p_result = new haxor.math.Vector3(); else p_result = p_result;
	return p_result.Set(p_a.x + (p_b.x - p_a.x) * p_r,p_a.y + (p_b.y - p_a.y) * p_r,p_a.z + (p_b.z - p_a.z) * p_r);
};
haxor.math.Vector3.Min = function(p_a,p_b,p_result) {
	if(p_result == null) p_result = new haxor.math.Vector3(); else p_result = p_result;
	p_result.x = Math.min(p_a.x,p_b.x);
	p_result.y = Math.min(p_a.y,p_b.y);
	p_result.z = Math.min(p_a.z,p_b.z);
	return p_result;
};
haxor.math.Vector3.Max = function(p_a,p_b,p_result) {
	if(p_result == null) p_result = new haxor.math.Vector3(); else p_result = p_result;
	p_result.x = Math.max(p_a.x,p_b.x);
	p_result.y = Math.max(p_a.y,p_b.y);
	p_result.z = Math.max(p_a.z,p_b.z);
	return p_result;
};
haxor.math.Vector3.Parse = function(p_data,p_delimiter) {
	if(p_delimiter == null) p_delimiter = " ";
	var tk = p_data.split(p_delimiter);
	return new haxor.math.Vector3(0,0,0).Set(Std.parseFloat(StringTools.trim(tk[0])),Std.parseFloat(StringTools.trim(tk[1])),Std.parseFloat(StringTools.trim(tk[2])));
};
haxor.math.Vector3.prototype = {
	get_clone: function() {
		return new haxor.math.Vector3(this.x,this.y,this.z);
	}
	,get_color: function() {
		return new haxor.math.Color(this.x,this.y,this.z);
	}
	,get_xzy: function() {
		return new haxor.math.Vector3(this.x,this.z,this.y);
	}
	,get_yxz: function() {
		return new haxor.math.Vector3(this.y,this.z,this.x);
	}
	,get_yzx: function() {
		return new haxor.math.Vector3(this.y,this.z,this.x);
	}
	,get_zxy: function() {
		return new haxor.math.Vector3(this.z,this.x,this.y);
	}
	,get_zyx: function() {
		return new haxor.math.Vector3(this.z,this.y,this.x);
	}
	,get_xy: function() {
		return new haxor.math.Vector2(this.x,this.y);
	}
	,get_xz: function() {
		return new haxor.math.Vector2(this.x,this.z);
	}
	,get_yx: function() {
		return new haxor.math.Vector2(this.y,this.x);
	}
	,get_yz: function() {
		return new haxor.math.Vector2(this.y,this.z);
	}
	,get_zx: function() {
		return new haxor.math.Vector2(this.z,this.x);
	}
	,get_zy: function() {
		return new haxor.math.Vector2(this.z,this.y);
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthSqr: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,get_normalized: function() {
		return new haxor.math.Vector3(this.x,this.y,this.z).Normalize();
	}
	,get_inverse: function() {
		return new haxor.math.Vector3(this.x,this.y,this.z).Invert();
	}
	,Set: function(p_x,p_y,p_z) {
		if(p_z == null) p_z = 0;
		if(p_y == null) p_y = 0;
		if(p_x == null) p_x = 0;
		this.x = p_x;
		this.y = p_y;
		this.z = p_z;
		return this;
	}
	,Set2: function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	,Set3: function(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	}
	,Set4: function(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	}
	,SetColor: function(v) {
		this.x = v.r;
		this.y = v.g;
		this.z = v.b;
		return this;
	}
	,Get: function(p) {
		if(p == 0) return this.x; else if(p == 1) return this.y; else return this.z;
	}
	,Add: function(p_v) {
		this.x += p_v.x;
		this.y += p_v.y;
		this.z += p_v.z;
		return this;
	}
	,Add3: function(p_x,p_y,p_z) {
		this.x += p_x;
		this.y += p_y;
		this.z += p_z;
		return this;
	}
	,Sub: function(p_v) {
		this.x -= p_v.x;
		this.y -= p_v.y;
		this.z -= p_v.z;
		return this;
	}
	,Multiply: function(p_v) {
		this.x *= p_v.x;
		this.y *= p_v.y;
		this.z *= p_v.z;
		return this;
	}
	,Step: function(p_to,p_step) {
		var vx = p_to.x - this.x;
		var vy = p_to.y - this.y;
		var vz = p_to.z - this.z;
		var l = Math.sqrt(vx * vx + vy * vy + vz * vz);
		if(l <= 0.0001) return false;
		var s;
		if(p_step > l) s = l; else s = p_step;
		l = s / l;
		vx *= l;
		vy *= l;
		vz *= l;
		this.x += vx;
		this.y += vy;
		this.z += vz;
		return true;
	}
	,Reflect: function(p_normal) {
		var d = Math.min(0.0,p_normal.x * this.x + p_normal.y * this.y + p_normal.z * this.z) * 2.0;
		this.x += -p_normal.x * d;
		this.y += -p_normal.y * d;
		this.z += -p_normal.z * d;
		return this;
	}
	,Invert: function() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this;
	}
	,Scale: function(p_s) {
		this.x *= p_s;
		this.y *= p_s;
		this.z *= p_s;
		return this;
	}
	,Normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l <= 0) return this;
		this.x *= l = 1.0 / l;
		this.y *= l;
		this.z *= l;
		return this;
	}
	,ToArray: function() {
		return [this.x,this.y,this.z];
	}
	,ToString: function(p_places) {
		if(p_places == null) p_places = 2;
		return "[" + haxor.math.Mathf.RoundPlaces(this.x,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.y,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.z,p_places) + "]";
	}
	,__class__: haxor.math.Vector3
};
haxor.math.Vector4 = function(p_x,p_y,p_z,p_w) {
	if(p_w == null) p_w = 0;
	if(p_z == null) p_z = 0;
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.x = p_x;
	this.y = p_y;
	this.z = p_z;
	this.w = p_w;
};
$hxClasses["haxor.math.Vector4"] = haxor.math.Vector4;
haxor.math.Vector4.__name__ = ["haxor","math","Vector4"];
haxor.math.Vector4.get_temp = function() {
	return haxor.context.EngineContext.data.get_v4();
};
haxor.math.Vector4.get_zero = function() {
	return new haxor.math.Vector4(0,0,0,0);
};
haxor.math.Vector4.get_one = function() {
	return new haxor.math.Vector4(1,1,1,1);
};
haxor.math.Vector4.get_W = function() {
	return new haxor.math.Vector4(0,0,0,1);
};
haxor.math.Vector4.Lerp = function(p_a,p_b,p_r) {
	return new haxor.math.Vector4(p_a.x + (p_b.x - p_a.x) * p_r,p_a.y + (p_b.y - p_a.y) * p_r,p_a.z + (p_b.z - p_a.z) * p_r,p_a.w + (p_b.w - p_a.w) * p_r);
};
haxor.math.Vector4.Parse = function(p_data,p_delimiter) {
	if(p_delimiter == null) p_delimiter = " ";
	var tk = p_data.split(p_delimiter);
	return new haxor.math.Vector4(0,0,0,0).Set(Std.parseFloat(StringTools.trim(tk[0])),Std.parseFloat(StringTools.trim(tk[1])),Std.parseFloat(StringTools.trim(tk[2])),Std.parseFloat(StringTools.trim(tk[3])));
};
haxor.math.Vector4.prototype = {
	get_clone: function() {
		return new haxor.math.Vector4(this.x,this.y,this.z,this.w);
	}
	,get_rgba: function() {
		return new haxor.math.Color(this.x,this.y,this.z,this.w);
	}
	,get_rgb: function() {
		return new haxor.math.Color(this.x,this.y,this.z);
	}
	,get_xyz: function() {
		return new haxor.math.Vector3(this.x,this.y,this.z);
	}
	,get_xy: function() {
		return new haxor.math.Vector2(this.x,this.y);
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	,get_lengthSqr: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	,get_normalized: function() {
		return new haxor.math.Vector4(this.x,this.y,this.z,this.w).Normalize();
	}
	,Get: function(p) {
		if(p == 0) return this.x; else if(p == 1) return this.y; else if(p == 2) return this.z; else return this.w;
	}
	,Set: function(p_x,p_y,p_z,p_w) {
		if(p_w == null) p_w = 0;
		if(p_z == null) p_z = 0;
		if(p_y == null) p_y = 0;
		if(p_x == null) p_x = 0;
		this.x = p_x;
		this.y = p_y;
		this.z = p_z;
		this.w = p_w;
		return this;
	}
	,Set2: function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	,Set3: function(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	}
	,SetColor: function(v) {
		this.x = v.r;
		this.y = v.g;
		this.z = v.b;
		return this;
	}
	,Add: function(p_v) {
		this.x += p_v.x;
		this.y += p_v.y;
		this.z += p_v.z;
		this.w += p_v.w;
		return this;
	}
	,Sub: function(p_v) {
		this.x -= p_v.x;
		this.y -= p_v.y;
		this.z -= p_v.z;
		this.w -= p_v.w;
		return this;
	}
	,Multiply: function(p_v) {
		this.x *= p_v.x;
		this.y *= p_v.y;
		this.z *= p_v.z;
		this.w *= p_v.w;
		return this;
	}
	,Scale: function(p_s) {
		this.x *= p_s;
		this.y *= p_s;
		this.z *= p_s;
		this.w *= p_s;
		return this;
	}
	,Normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		if(l <= 0) return this;
		this.x *= l = 1.0 / l;
		this.y *= l;
		this.z *= l;
		this.w *= l;
		return this;
	}
	,IsCulled: function() {
		if(this.x < -this.w) return true;
		if(this.x > this.w) return true;
		if(this.y < -this.w) return true;
		if(this.y > this.w) return true;
		if(this.z < -this.w) return true;
		if(this.z > this.w) return true;
		return false;
	}
	,ToArray: function() {
		return [this.x,this.y,this.z,this.w];
	}
	,ToString: function(p_places) {
		if(p_places == null) p_places = 2;
		return "[" + haxor.math.Mathf.RoundPlaces(this.x,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.y,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.z,p_places) + "," + haxor.math.Mathf.RoundPlaces(this.w,p_places) + "]";
	}
	,__class__: haxor.math.Vector4
};
haxor.platform.html.Entry = function() { };
$hxClasses["haxor.platform.html.Entry"] = haxor.platform.html.Entry;
haxor.platform.html.Entry.__name__ = ["haxor","platform","html","Entry"];
haxor.platform.html.Entry.Initialize = function() {
	window.onload = haxor.platform.html.Entry.OnWindowLoad;
};
haxor.platform.html.Entry.OnWindowLoad = function(p_event) {
	haxor.core.Console.Initialize();
	var script_list = window.document.getElementsByTagName("SCRIPT");
	var attrib = "";
	var app_class_type = "Main";
	var app_container_id = "haxor";
	var app_input_id = "haxor";
	var _g1 = 0;
	var _g = script_list.length;
	while(_g1 < _g) {
		var i = _g1++;
		var scr = script_list.item(i);
		attrib = scr.getAttribute("verbose");
		if(attrib != null) {
			if(attrib == "") attrib = "0"; else attrib = attrib;
			haxor.core.Console.verbose = Std.parseInt(attrib);
		}
		attrib = scr.getAttribute("application");
		if(attrib != null) app_class_type = attrib;
		attrib = scr.getAttribute("container");
		if(attrib != null) app_container_id = attrib;
		attrib = scr.getAttribute("input");
		if(attrib != null) app_input_id = attrib;
	}
	haxor.core.Console.Log("Haxor> HTML Platform Init verbose[" + haxor.core.Console.verbose + "] application[" + app_class_type + "] container[" + app_container_id + "]",1);
	var tag_strings = window.document.getElementsByTagName("strings");
	if(tag_strings != null) {
		if(tag_strings.length > 0) {
			var k = 0;
			var _g11 = 0;
			var _g2 = tag_strings.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				var it = tag_strings.item(i1);
				var l = it.childNodes;
				var _g3 = 0;
				var _g21 = l.length;
				while(_g3 < _g21) {
					var j = _g3++;
					var e = l.item(j);
					var _g4 = e.nodeName.toLowerCase();
					switch(_g4) {
					case "entry":
						var key = e.getAttribute("key");
						var val = e.textContent;
						haxor.io.file.Asset.Add(key,val);
						k++;
						break;
					}
				}
				it.remove();
			}
			haxor.core.Console.Log("Haxor> Found " + k + " Strings",2);
		}
	}
	if(app_class_type == "") {
		haxor.core.Console.Log("Haxor> Error. You must define an Application class.");
		return;
	}
	var app_class = Type.resolveClass(app_class_type);
	if(app_class == null) {
		haxor.core.Console.Log("Haxor> Error. Class [" + app_class_type + "] not found! Try adding 'import " + app_class_type + "' in your Main file.");
		return;
	}
	haxor.core.Engine.Initialize();
	var e1 = new haxor.core.Entity("application");
	haxor.platform.html.Entry.m_application = e1.AddComponent(app_class);
	if(!js.Boot.__instanceof(haxor.platform.html.Entry.m_application,haxor.core.BaseApplication)) {
		haxor.core.Console.Log("Haxor> Error. Class [" + app_class_type + "] does not extends Application!");
		return;
	}
	haxor.core.Console.Log("Haxor> Application [" + app_class_type + "] created successfully!",1);
	haxor.platform.html.Entry.m_application.m_container = window.document.getElementById(app_container_id);
	if(haxor.platform.html.Entry.m_application.m_container == null) {
		haxor.core.Console.Log("Graphics> DOM container not defined id[" + app_container_id + "] using 'body'.");
		haxor.platform.html.Entry.m_application.m_container = window.document.body;
	}
	var cd = haxor.platform.html.Entry.m_application.m_container.style.display;
	haxor.platform.html.Entry.m_application.m_container.style.display = "none";
	haxor.graphics.GL.Initialize(haxor.platform.html.Entry.m_application);
	haxor.graphics.GL.m_gl.Initialize(app_container_id);
	haxor.graphics.GL.m_gl.CheckExtensions();
	haxor.core.Console.Log("Haxor> Creating Stage with [" + app_container_id + "]",1);
	var stage = new haxor.dom.DOMStage(haxor.platform.html.Entry.m_application.m_container);
	stage.Parse(haxor.platform.html.Entry.m_application.m_container);
	haxe.Timer.delay(function() {
		haxor.platform.html.Entry.m_application.m_container.style.display = cd;
	},100);
	haxor.context.EngineContext.Build();
	haxor.platform.html.Entry.m_input = new haxor.platform.html.input.HTMLInputHandler(app_input_id);
	haxor.input.Input.m_handler = haxor.platform.html.Entry.m_input;
	if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) window.requestAnimationFrame(haxor.platform.html.Entry.RequestAnimationCallback); else {
		haxor.core.Time.m_clock_0 = haxe.Timer.stamp() * 1000.0;
		haxor.platform.html.Entry.TimeOutLoop();
	}
	if(haxor.platform.html.Entry.m_application.Load()) haxor.platform.html.Entry.m_application.LoadComplete();
};
haxor.platform.html.Entry.RequestAnimationCallback = function(p_time) {
	haxor.core.Time.m_system = p_time;
	haxor.platform.html.Entry.m_application.Update();
	haxor.platform.html.Entry.m_application.Render();
	window.requestAnimationFrame(haxor.platform.html.Entry.RequestAnimationCallback);
	return true;
};
haxor.platform.html.Entry.TimeOutLoop = function() {
	haxor.core.Time.m_system = haxe.Timer.stamp() * 1000.0 - haxor.core.Time.m_clock_0;
	haxor.platform.html.Entry.m_application.Update();
	haxor.platform.html.Entry.m_application.Render();
	window.setTimeout(haxor.platform.html.Entry.TimeOutLoop,10);
};
haxor.platform.html.graphics = {};
haxor.platform.html.graphics.WebGL = function(p_application) {
	haxor.graphics.GraphicContext.call(this,p_application);
	this.m_api = haxor.graphics.GraphicAPI.WebGL;
};
$hxClasses["haxor.platform.html.graphics.WebGL"] = haxor.platform.html.graphics.WebGL;
haxor.platform.html.graphics.WebGL.__name__ = ["haxor","platform","html","graphics","WebGL"];
haxor.platform.html.graphics.WebGL.__super__ = haxor.graphics.GraphicContext;
haxor.platform.html.graphics.WebGL.prototype = $extend(haxor.graphics.GraphicContext.prototype,{
	Initialize: function(p_container_id) {
		var app = this.m_application;
		app.m_container = this.m_container = window.document.getElementById(p_container_id);
		if(this.m_container == null) {
			haxor.core.Console.Log("Graphics> Canvas container not defined id[" + p_container_id + "].");
			return false;
		}
		var _this = window.document;
		this.m_canvas = _this.createElement("canvas");
		this.m_canvas.style.position = "absolute";
		this.m_canvas.style.left = "0px";
		this.m_canvas.style.top = "0px";
		this.m_canvas.style.width = "100%";
		this.m_canvas.style.height = "100%";
		this.m_canvas.width = this.m_container.clientWidth;
		this.m_canvas.height = this.m_container.clientHeight;
		this.m_canvas.id = "haxor-canvas";
		var fc = this.m_container.firstElementChild;
		this.m_container.appendChild(this.m_canvas);
		if(fc != null) this.m_container.insertBefore(this.m_canvas,fc);
		var ctx_attrib = { };
		var ctx_attrib_list = ["alpha","antialias","depth","stencil","premultipliedAlpha","preserveDrawingBuffer"];
		var ctx_attrib_default = [false,false,true,false,true,false];
		haxor.core.Console.Log("Graphics> Initialize WebGL",1);
		var _g1 = 0;
		var _g = ctx_attrib_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			var a = ctx_attrib_list[i];
			var ca = this.m_container.getAttribute(ctx_attrib_list[i]);
			var flag;
			if(ca == null) flag = ctx_attrib_default[i]; else flag = ca == "true";
			haxor.core.Console.Log("\t" + ctx_attrib_list[i] + ": " + (flag == null?"null":"" + flag),1);
			ctx_attrib[a]=flag;
		}
		var attribs = ctx_attrib;
		this.c = js.html._CanvasElement.CanvasUtil.getContextWebGL(this.m_canvas,attribs);
		if(this.c == null) {
			haxor.core.Console.Log("Graphics> Could not create RenderingContext3D.");
			return false;
		}
		return true;
	}
	,CheckExtensions: function() {
		if(this.c == null) return;
		haxor.core.Console.Log("Graphics> Available Extensions.",1);
		var extensions = this.c.getSupportedExtensions();
		var _g1 = 0;
		var _g = extensions.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(extensions[i].indexOf("MOZ_") >= 0) continue;
			if(extensions[i].indexOf("WEBKIT_") >= 0) continue;
			var ext = this.c.getExtension(extensions[i]);
			haxor.core.Console.Log("\t" + extensions[i],1);
			var _g2 = extensions[i];
			switch(_g2) {
			case "OES_vertex_array_object":
				haxor.graphics.GL.VERTEX_ARRAY_OBJECT = true;
				break;
			case "OES_texture_half_float":
				haxor.graphics.GL.HALF_FLOAT = 36193;
				haxor.graphics.GL.TEXTURE_HALF = true;
				break;
			case "OES_texture_half_float_linear":
				haxor.graphics.GL.TEXTURE_HALF_LINEAR = true;
				break;
			case "EXT_texture_filter_anisotropic":case "WEBKIT_EXT_texture_filter_anisotropic":
				haxor.graphics.GL.TEXTURE_ANISOTROPY = ext.TEXTURE_MAX_ANISOTROPY_EXT;
				haxor.graphics.GL.MAX_TEXTURE_ANISOTROPY = this.c.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
				haxor.graphics.GL.TEXTURE_ANISOTROPY_ENABLED = true;
				haxor.core.Console.Log("\t\tMax Aniso: " + haxor.graphics.GL.MAX_TEXTURE_ANISOTROPY,1);
				break;
			case "OES_texture_float":
				haxor.graphics.GL.TEXTURE_FLOAT = true;
				break;
			case "OES_depth_texture":
				haxor.graphics.GL.TEXTURE_DEPTH_ENABLED = true;
				break;
			}
		}
		haxor.graphics.GL.MAX_ACTIVE_TEXTURE = this.c.getParameter(34930);
		haxor.core.Console.Log("\tMax Active Textures: " + haxor.graphics.GL.MAX_ACTIVE_TEXTURE,1);
	}
	,Resize: function() {
		this.m_canvas.width = this.m_container.clientWidth;
		this.m_canvas.height = this.m_container.clientHeight;
	}
	,CreateBuffer: function() {
		return this.c.createBuffer();
	}
	,BindBuffer: function(p_target,p_id) {
		this.c.bindBuffer(p_target,p_id);
	}
	,BufferData: function(p_target,p_data,p_mode) {
		this.c.bufferData(p_target,p_data.m_buffer,p_mode);
	}
	,BufferSubData: function(p_target,p_offset,p_data) {
		this.c.bufferSubData(p_target,p_offset,p_data.m_buffer);
	}
	,DeleteBuffer: function(p_id) {
		this.c.deleteBuffer(p_id);
	}
	,DrawArrays: function(p_primitive,p_start,p_count) {
		this.c.drawArrays(p_primitive,p_start,p_count);
	}
	,DrawElements: function(p_primitive,p_count,p_type,p_offset) {
		this.c.drawElements(p_primitive,p_count,p_type,p_offset);
	}
	,DisableVertexAttrib: function(p_location) {
		this.c.disableVertexAttribArray(p_location);
	}
	,EnableVertexAttrib: function(p_location) {
		this.c.enableVertexAttribArray(p_location);
	}
	,VertexAttrib3f: function(p_location,p_x,p_y,p_z) {
		this.c.vertexAttrib3f(p_location,p_x,p_y,p_z);
	}
	,VertexAttrib4f: function(p_location,p_x,p_y,p_z,p_w) {
		this.c.vertexAttrib4f(p_location,p_x,p_y,p_z,p_w);
	}
	,VertexAttribPointer: function(p_location,p_components_size,p_type,p_normalized,p_stride,p_offset) {
		this.c.vertexAttribPointer(p_location,p_components_size,p_type,p_normalized,p_stride,p_offset);
	}
	,CompileShader: function(p_shader) {
		this.c.compileShader(p_shader);
	}
	,CreateShader: function(p_type) {
		return this.c.createShader(p_type);
	}
	,DetachShader: function(p_program,p_shader) {
		this.c.detachShader(p_program,p_shader);
	}
	,DeleteShader: function(p_shader) {
		this.c.deleteShader(p_shader);
	}
	,GetShaderInfoLog: function(p_shader) {
		return this.c.getShaderInfoLog(p_shader);
	}
	,GetShaderParameter: function(p_shader,p_parameter) {
		return this.c.getShaderParameter(p_shader,p_parameter);
	}
	,ShaderSource: function(p_shader,p_source) {
		this.c.shaderSource(p_shader,p_source);
	}
	,AttachShader: function(p_program,p_shader) {
		this.c.attachShader(p_program,p_shader);
	}
	,BindAttribLocation: function(p_program,p_location,p_name) {
		this.c.bindAttribLocation(p_program,p_location,p_name);
	}
	,CreateProgram: function() {
		return this.c.createProgram();
	}
	,DeleteProgram: function(p_program) {
		this.c.deleteProgram(p_program);
	}
	,GetAttribLocation: function(p_program,p_name) {
		return this.c.getAttribLocation(p_program,p_name);
	}
	,GetUniformLocation: function(p_program,p_name) {
		return this.c.getUniformLocation(p_program,p_name);
	}
	,GetProgramInfoLog: function(p_program) {
		return this.c.getProgramInfoLog(p_program);
	}
	,GetProgramParameter: function(p_program,p_parameter) {
		return this.c.getProgramParameter(p_program,p_parameter);
	}
	,LinkProgram: function(p_program) {
		this.c.linkProgram(p_program);
	}
	,UseProgram: function(p_program) {
		this.c.useProgram(p_program);
	}
	,ActiveTexture: function(p_slot) {
		this.c.activeTexture(p_slot);
	}
	,BindFramebuffer: function(p_target,p_id) {
		this.c.bindFramebuffer(p_target,p_id);
	}
	,BindRenderbuffer: function(p_target,p_id) {
		this.c.bindRenderbuffer(p_target,p_id);
	}
	,BindTexture: function(p_target,p_id) {
		this.c.bindTexture(p_target,p_id);
	}
	,CreateFramebuffer: function() {
		return this.c.createFramebuffer();
	}
	,CreateRenderbuffer: function() {
		return this.c.createRenderbuffer();
	}
	,CreateTexture: function() {
		return this.c.createTexture();
	}
	,DeleteFramebuffer: function(p_id) {
		this.c.deleteFramebuffer(p_id);
	}
	,DeleteRenderbuffer: function(p_id) {
		this.c.deleteRenderbuffer(p_id);
	}
	,DeleteTexture: function(p_id) {
		this.c.deleteTexture(p_id);
	}
	,FramebufferRenderbuffer: function(p_target,p_attachment,p_renderbuffer_target,p_renderbuffer_id) {
		this.c.framebufferRenderbuffer(p_target,p_attachment,p_renderbuffer_target,p_renderbuffer_id);
	}
	,FramebufferTexture2D: function(p_target,p_attachment,p_texture_target,p_texture_id,p_miplevel) {
		this.c.framebufferTexture2D(p_target,p_attachment,p_texture_target,p_texture_id,p_miplevel);
	}
	,GenerateMipmap: function(p_target) {
		this.c.generateMipmap(p_target);
	}
	,PixelStorei: function(p_parameter,p_value) {
		this.c.pixelStorei(p_parameter,p_value);
	}
	,RenderbufferStorage: function(p_target,p_format,p_width,p_height) {
		this.c.renderbufferStorage(p_target,p_format,p_width,p_height);
	}
	,TexImage2D: function(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type,p_data) {
		this.c.texImage2D(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type,p_data.aux);
	}
	,TexImage2DAlloc: function(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type) {
		this.c.texImage2D(p_target,p_level,p_internal_format,p_width,p_height,p_border,p_format,p_channel_type,null);
	}
	,TexSubImage2D: function(p_target,p_level,p_x,p_y,p_width,p_height,p_format,p_channel_type,p_data) {
		this.c.texSubImage2D(p_target,p_level,p_x,p_y,p_width,p_height,p_format,p_channel_type,p_data.aux);
	}
	,TexParameterf: function(p_target,p_parameter,p_value) {
		this.c.texParameterf(p_target,p_parameter,p_value);
	}
	,TexParameteri: function(p_target,p_parameter,p_value) {
		this.c.texParameteri(p_target,p_parameter,p_value);
	}
	,BlendFunc: function(p_src,p_dst) {
		this.c.blendFunc(p_src,p_dst);
	}
	,Disable: function(p_flag) {
		this.c.disable(p_flag);
	}
	,Enable: function(p_flag) {
		this.c.enable(p_flag);
	}
	,DepthMask: function(p_flag) {
		this.c.depthMask(p_flag);
	}
	,DepthFunc: function(p_flag) {
		this.c.depthFunc(p_flag);
	}
	,CullFace: function(p_face) {
		this.c.cullFace(p_face);
	}
	,FrontFace: function(p_face) {
		this.c.frontFace(p_face);
	}
	,Uniform1f: function(p_location,p_x) {
		this.c.uniform1f(p_location,p_x);
	}
	,Uniform2f: function(p_location,p_x,p_y) {
		this.c.uniform2f(p_location,p_x,p_y);
	}
	,Uniform3f: function(p_location,p_x,p_y,p_z) {
		this.c.uniform3f(p_location,p_x,p_y,p_z);
	}
	,Uniform4f: function(p_location,p_x,p_y,p_z,p_w) {
		this.c.uniform4f(p_location,p_x,p_y,p_z,p_w);
	}
	,Uniform1i: function(p_location,p_x) {
		this.c.uniform1i(p_location,p_x);
	}
	,Uniform2i: function(p_location,p_x,p_y) {
		this.c.uniform2i(p_location,p_x,p_y);
	}
	,Uniform3i: function(p_location,p_x,p_y,p_z) {
		this.c.uniform3i(p_location,p_x,p_y,p_z);
	}
	,Uniform4i: function(p_location,p_x,p_y,p_z,p_w) {
		this.c.uniform4i(p_location,p_x,p_y,p_z,p_w);
	}
	,Uniform1fv: function(p_location,p_v) {
		this.c.uniform1fv(p_location,p_v.aux);
	}
	,Uniform2fv: function(p_location,p_v) {
		this.c.uniform2fv(p_location,p_v.aux);
	}
	,Uniform3fv: function(p_location,p_v) {
		this.c.uniform3fv(p_location,p_v.aux);
	}
	,Uniform4fv: function(p_location,p_v) {
		this.c.uniform4fv(p_location,p_v.aux);
	}
	,Uniform1iv: function(p_location,p_v) {
		this.c.uniform1iv(p_location,p_v.aux);
	}
	,Uniform2iv: function(p_location,p_v) {
		this.c.uniform2iv(p_location,p_v.aux);
	}
	,Uniform3iv: function(p_location,p_v) {
		this.c.uniform3iv(p_location,p_v.aux);
	}
	,Uniform4iv: function(p_location,p_v) {
		this.c.uniform4iv(p_location,p_v.aux);
	}
	,UniformMatrix2fv: function(p_location,p_transpose,p_v) {
		this.c.uniformMatrix2fv(p_location,p_transpose,p_v.aux);
	}
	,UniformMatrix3fv: function(p_location,p_transpose,p_v) {
		this.c.uniformMatrix3fv(p_location,p_transpose,p_v.aux);
	}
	,UniformMatrix4fv: function(p_location,p_transpose,p_v) {
		this.c.uniformMatrix4fv(p_location,p_transpose,p_v.aux);
	}
	,Clear: function(p_flag) {
		this.c.clear(p_flag);
	}
	,ClearDepth: function(p_value) {
		this.c.clearDepth(p_value);
	}
	,ClearColor: function(p_r,p_g,p_b,p_a) {
		this.c.clearColor(p_r,p_g,p_b,p_a);
	}
	,Viewport: function(p_x,p_y,p_width,p_height) {
		this.c.viewport(p_x,p_y,p_width,p_height);
	}
	,Scissor: function(p_x,p_y,p_width,p_height) {
		this.c.scissor(p_x,p_y,p_width,p_height);
	}
	,ReadPixels: function(p_x,p_y,p_width,p_height,p_format,p_type,p_pixels) {
		this.c.readPixels(p_x,p_y,p_width,p_height,p_format,p_type,p_pixels.m_buffer);
	}
	,Flush: function() {
	}
	,GetErrorCode: function() {
		return this.c.getError();
	}
	,__class__: haxor.platform.html.graphics.WebGL
});
haxor.platform.html.input = {};
haxor.platform.html.input.HTMLInputHandler = function(p_target_id) {
	haxor.input.InputHandler.call(this);
	this.m_navigator = window.navigator;
	this.m_target = window.document.getElementById(p_target_id);
	if(this.m_target == null) {
		haxor.core.Console.LogWarning("Input> Target Element not found! Using [document] as target.");
		this.m_target = window.document.body;
	}
	this.m_events = [];
	this.m_target.onmousedown = $bind(this,this.OnInputEvent);
	this.m_target.onmouseover = $bind(this,this.OnInputEvent);
	this.m_target.onmousewheel = $bind(this,this.OnInputEvent);
	this.m_target.oncontextmenu = $bind(this,this.OnInputEvent);
	window.document.onmousemove = $bind(this,this.OnInputEvent);
	window.document.onmouseup = $bind(this,this.OnInputEvent);
	window.document.onkeydown = $bind(this,this.OnInputEvent);
	window.document.onkeyup = $bind(this,this.OnInputEvent);
	try {
		this.m_target.addEventListener("DOMMouseScroll",$bind(this,this.OnInputEvent));
	} catch( ex ) {
	}
	try {
		haxor.input.Input.m_multitouch = TouchEvent != null;
	} catch( ex1 ) {
		haxor.input.Input.m_multitouch = false;
	}
	if(haxor.input.Input.get_multitouch()) {
		this.m_target.ontouchstart = $bind(this,this.OnTouchEvent);
		window.document.ontouchmove = $bind(this,this.OnTouchEvent);
		window.document.ontouchcancel = $bind(this,this.OnTouchEvent);
		window.document.ontouchend = $bind(this,this.OnTouchEvent);
	}
	var t = this.m_target;
	var nav = this.m_navigator;
	this.m_check_joystick = !(!nav.getGamepads) || nav.userAgent.indexOf("Firefox/") != -1;
};
$hxClasses["haxor.platform.html.input.HTMLInputHandler"] = haxor.platform.html.input.HTMLInputHandler;
haxor.platform.html.input.HTMLInputHandler.__name__ = ["haxor","platform","html","input","HTMLInputHandler"];
haxor.platform.html.input.HTMLInputHandler.__super__ = haxor.input.InputHandler;
haxor.platform.html.input.HTMLInputHandler.prototype = $extend(haxor.input.InputHandler.prototype,{
	UpdateInput: function() {
		if(this.m_events.length > 0) while(this.m_events.length > 0) this.ProcessInputEvent(this.m_events.shift());
		this.UpdateJoystick();
	}
	,OnInputEvent: function(p_event) {
		var e;
		if(p_event == null) e = window.event; else e = p_event;
		var c;
		c = e;
		this.m_events.push(c);
		var is_mousedown = c.type == "mousedown";
		var is_mousewheel = c.type == "mousewheel" || c.type == "wheel";
		var prevent = is_mousedown || is_mousewheel;
		prevent = prevent && js.Boot.__instanceof(this.m_target,HTMLCanvasElement);
		if(haxor.input.Input.scroll) prevent = false;
		if(c.type == "contextmenu") {
			if(!haxor.input.Input.menu) prevent = true;
		}
		if(prevent) {
			if(haxor.input.Input.relativeMouse.x >= 0) {
				if(haxor.input.Input.relativeMouse.x <= 1) {
					if(haxor.input.Input.relativeMouse.y >= 0) {
						if(haxor.input.Input.relativeMouse.y <= 1) {
							if($bind(e,e.preventDefault) != null) e.preventDefault();
						}
					}
				}
			}
		}
	}
	,ProcessInputEvent: function(p_event) {
		var me = p_event;
		var ke = p_event;
		var element = p_event.target;
		var _g = p_event.type;
		switch(_g) {
		case "wheel":case "mousewheel":case "DOMMouseScroll":
			var we = p_event;
			var dw;
			if(we.wheelDeltaY == null) dw = we.detail * 40; else dw = we.wheelDeltaY;
			this.OnMouseWheel(dw / 100.0);
			break;
		case "mousemove":
			var px = me.pageX;
			var py = me.pageY;
			if(px == null) px = me.clientX;
			if(py == null) py = me.clientY;
			var p = this.GetAbsolutePosition(this.m_target,px,py);
			this.OnMouseMove(p.x,p.y);
			break;
		case "mouseup":
			this.OnMouseButton(me.button,false);
			break;
		case "mousedown":
			this.OnMouseButton(me.button,true);
			break;
		case "keyup":
			this.OnKey(ke.keyCode,false);
			break;
		case "keydown":
			this.OnKey(ke.keyCode,true);
			break;
		case "contextmenu":
			break;
		}
	}
	,OnTouchEvent: function(p_event) {
		var te = p_event;
		var _g1 = 0;
		var _g = te.changedTouches.length;
		while(_g1 < _g) {
			var i = _g1++;
			var t = te.changedTouches.item(i);
			var p = this.GetAbsolutePosition(this.m_target,t.pageX,t.pageY);
			var _g2 = p_event.type;
			switch(_g2) {
			case "touchstart":
				this.OnTouchStart(t.identifier,p.x,p.y,t.radiusX,t.radiusY,t.force,t.rotationAngle);
				break;
			case "touchmove":
				this.OnTouchMove(t.identifier,p.x,p.y);
				break;
			case "touchcancel":
				this.OnTouchCancel(t.identifier);
				break;
			case "touchend":
				this.OnTouchEnd(t.identifier);
				break;
			}
		}
		if(haxor.input.Input.m_touches.length > 0) {
			if(!haxor.input.Input.scroll) p_event.preventDefault();
		}
	}
	,UpdateJoystick: function() {
		if(!this.m_check_joystick) return;
		var nav = this.m_navigator;
		var l = null;
		if(nav.getGamepads != null) l = nav.getGamepads();
		if(l == null) return;
		if(l.length <= 0) return;
		var _g1 = 0;
		var _g = l.length;
		while(_g1 < _g) {
			var i = _g1++;
			var gp = l.item(i);
			if(gp == null) continue;
			this.OnJoystickStart(gp.index,gp.id);
			var _g3 = 0;
			var _g2 = gp.buttons.length;
			while(_g3 < _g2) {
				var i1 = _g3++;
				var bt = gp.buttons[i1];
				this.OnJoystickDataUpdate(i1,bt.value,false);
			}
			var _g31 = 0;
			var _g21 = gp.axes.length;
			while(_g31 < _g21) {
				var i2 = _g31++;
				this.OnJoystickDataUpdate(i2,gp.axes[i2],true);
			}
			this.OnJoystickAnalogUpdate();
		}
	}
	,GetAbsolutePosition: function(p_element,p_x,p_y) {
		var px = 0;
		var py = 0;
		var e = p_element;
		do {
			px += e.offsetLeft;
			py += e.offsetTop;
			e = e.offsetParent;
		} while(e != null);
		px = p_x - px;
		py = p_y - py;
		return haxor.context.EngineContext.data.get_v2().Set(px,py);
	}
	,__class__: haxor.platform.html.input.HTMLInputHandler
});
haxor.thread = {};
haxor.thread.Activity = function(p_callback,p_threaded,p_graphics_context) {
	if(p_graphics_context == null) p_graphics_context = false;
	if(p_threaded == null) p_threaded = false;
	haxor.core.Resource.call(this);
	if(p_callback == null) return;
	this.m_time_start = haxor.core.Time.m_elapsed;
	this.m_elapsed = 0.0;
	this.m_callback = p_callback;
	this.m_cancelled = false;
	p_threaded = false;
	if(p_graphics_context) p_threaded = false;
	if(!p_threaded) {
		if(p_graphics_context) haxor.context.EngineContext.render.Add(this); else haxor.context.EngineContext.update.Add(this);
	} else {
	}
};
$hxClasses["haxor.thread.Activity"] = haxor.thread.Activity;
haxor.thread.Activity.__name__ = ["haxor","thread","Activity"];
haxor.thread.Activity.__interfaces__ = [haxor.core.IRenderable,haxor.core.IUpdateable];
haxor.thread.Activity.Iterate = function(p_offset,p_length,p_callback,p_step,p_threaded,p_graphics_context) {
	if(p_graphics_context == null) p_graphics_context = false;
	if(p_threaded == null) p_threaded = false;
	if(p_step == null) p_step = 1;
	var it = p_offset;
	return new haxor.thread.Activity(function(t) {
		var finished = false;
		var _g = 0;
		while(_g < p_step) {
			var i = _g++;
			if(it >= p_length) return false;
			if(!p_callback(it)) {
				finished = true;
				break;
			}
			it++;
		}
		return !finished;
	},p_threaded,p_graphics_context);
};
haxor.thread.Activity.Delay = function(p_time,p_callback,p_threaded,p_graphics_context) {
	if(p_graphics_context == null) p_graphics_context = false;
	if(p_threaded == null) p_threaded = false;
	return new haxor.thread.Activity(function(t) {
		if(t >= p_time) {
			p_callback();
			return false;
		}
		return true;
	},p_threaded,p_graphics_context);
};
haxor.thread.Activity.Run = function(p_callback,p_threaded,p_graphics_context) {
	if(p_graphics_context == null) p_graphics_context = false;
	if(p_threaded == null) p_threaded = false;
	return new haxor.thread.Activity(p_callback,p_threaded,p_graphics_context);
};
haxor.thread.Activity.RunOnce = function(p_callback,p_threaded,p_graphics_context) {
	if(p_graphics_context == null) p_graphics_context = false;
	if(p_threaded == null) p_threaded = false;
	return new haxor.thread.Activity(function(t) {
		p_callback();
		return false;
	},p_threaded,p_graphics_context);
};
haxor.thread.Activity.__super__ = haxor.core.Resource;
haxor.thread.Activity.prototype = $extend(haxor.core.Resource.prototype,{
	get_elapsed: function() {
		return this.m_elapsed;
	}
	,Cancel: function() {
		this.m_cancelled = true;
	}
	,OnUpdate: function() {
		this.OnRun();
	}
	,OnRender: function() {
		this.OnRun();
	}
	,OnRun: function() {
		if(this.m_cancelled) {
			haxor.core.Resource.Destroy(this);
			return;
		}
		this.m_elapsed = haxor.core.Time.m_elapsed - this.m_time_start;
		if(!this.m_callback(this.m_elapsed)) haxor.core.Resource.Destroy(this);
	}
	,__class__: haxor.thread.Activity
});
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
js.html._CanvasElement.CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var me = {};
me.client = {};
me.client.App = function() {
	haxor.core.Application.call(this);
};
$hxClasses["me.client.App"] = me.client.App;
me.client.App.__name__ = ["me","client","App"];
me.client.App.main = function() {
	haxor.platform.html.Entry.Initialize();
};
me.client.App.__super__ = haxor.core.Application;
me.client.App.prototype = $extend(haxor.core.Application.prototype,{
	Initialize: function() {
		haxor.core.Console.Log("App> Initialize");
		window.document.body.style.removeProperty("display");
		this.get_stage().Find("content.sections.front.content.button-gifts").get_element().onclick = function(ev) {
			window.location.href = "http://www.originalway.com.br/ViagemPresenteDetalhe.aspx?id=17";
		};
	}
	,__class__: me.client.App
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
haxe.crypto.Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe.crypto.Base64.BYTES = haxe.io.Bytes.ofString(haxe.crypto.Base64.CHARS);
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
haxor.component.Light.ambient = new haxor.math.Color(0.0,0.0,0.0,1.0);
haxor.component.Light.max = 8;
haxor.component.Light.m_list = [];
haxor.context.DataContext.MAX_TEMP = 128;
haxor.context.EngineContext.uid = 0;
haxor.context.EngineContext.maxNodes = 5000;
haxor.context.EngineContext.collectRate = 10;
haxor.context.BaseProcess.m_cid = 0;
haxor.context.ShaderContext.flat_source = "\r\n\t<shader id=\"haxor/unlit/Flat\">\t\r\n\t\t<vertex>\t\t\r\n\t\tuniform mat4  WorldMatrix;\r\n\t\tuniform mat4  ViewMatrix;\r\n\t\tuniform mat4  ProjectionMatrix;\t\t\r\n\t\tuniform vec4  Tint;\t\t\t\t\r\n\t\tattribute vec3 vertex;\t\t\r\n\t\tattribute vec4 color;\t\t\r\n\t\tvarying vec4 v_color;\t\t\r\n\t\tvoid main(void) \r\n\t\t{\t\t\r\n\t\t\tgl_Position = ((vec4(vertex, 1.0) * WorldMatrix) * ViewMatrix) * ProjectionMatrix;\t\t\t\t\r\n\t\t\tv_color = color * Tint;\r\n\t\t}\t\t\r\n\t\t</vertex>\t\t\r\n\t\t<fragment>\t\t\t\r\n\t\t\tvarying vec4 v_color;\t\t\t\r\n\t\t\tvoid main(void) { gl_FragColor = v_color; }\t\t\t\r\n\t\t</fragment>\t\r\n\t</shader>\t\r\n\t";
haxor.context.ShaderContext.flat_texture_source = "\r\n\t<shader id=\"haxor/unlit/FlatTexture\">\t\r\n\t\t<vertex>\r\n\t\tuniform mat4  WorldMatrix;\r\n\t\tuniform mat4  ViewMatrix;\r\n\t\tuniform mat4  ProjectionMatrix;\t\t\r\n\t\tattribute vec3 vertex;\t\t\t\t\t\r\n\t\tattribute vec4 color;\r\n\t\tattribute vec3 uv0;\t\t\r\n\t\tvarying vec3 v_uv0;\r\n\t\tvarying vec4 v_color;\t\t\r\n\t\tvoid main(void) \r\n\t\t{\t\t\r\n\t\t\tgl_Position = ((vec4(vertex, 1.0) * WorldMatrix) * ViewMatrix) * ProjectionMatrix;\r\n\t\t\tv_uv0   = uv0;\r\n\t\t\tv_color = color;\r\n\t\t}\t\t\r\n\t\t</vertex>\t\t\r\n\t\t<fragment>\r\n\t\t\tvarying vec3 v_uv0;\r\n\t\t\tvarying vec4 v_color;\t\t\t\r\n\t\t\tuniform sampler2D DiffuseTexture;\r\n\t\t\tvoid main(void) \r\n\t\t\t{\t\r\n\t\t\t\tvec4 tex_diffuse = texture2D(DiffuseTexture, v_uv0.xy);\t\r\n\t\t\t\tgl_FragColor.xyz = (tex_diffuse.xyz * v_color.xyz);\r\n\t\t\t\tgl_FragColor.a \t = tex_diffuse.a * v_color.a;\r\n\t\t\t}\r\n\t\t</fragment>\t\r\n\t</shader>\r\n\t";
haxor.context.ShaderContext.flat_texture_skin_source = "\r\n\t<shader id=\"haxor/unlit/FlatTextureSkin\">\t\r\n\t\t<vertex precision=\"high\">\r\n\t\t\r\n\t\t#define SKINNING_TEXTURE_SIZE 2048.0\r\n\t\t#define BINDS_OFFSET\t\t  1024.0\r\n\t\t\r\n\t\tuniform mat4  WorldMatrix;\r\n\t\tuniform mat4  WorldMatrixIT;\r\n\t\tuniform mat4  ViewMatrix;\r\n\t\tuniform mat4  ProjectionMatrix;\r\n\t\tuniform vec3  WSCameraPosition;\t\t\r\n\t\t\r\n\t\t//uniform vec4  Skinning[MAX_BONES];\r\n\t\t\r\n\t\tuniform sampler2D Skinning;\r\n\t\t\r\n\t\tattribute vec3 vertex;\t\t\t\t\t\r\n\t\tattribute vec4 color;\r\n\t\tattribute vec3 normal;\r\n\t\tattribute vec3 uv0;\r\n\t\tattribute vec4 bone;\r\n\t\tattribute vec4 weight;\r\n\t\t\r\n\t\tvarying vec3 v_uv0;\r\n\t\tvarying vec3 v_normal;\r\n\t\tvarying vec4 v_color;\r\n\t\tvarying vec4 v_wsVertex;\r\n\t\tvarying vec3 v_wsView;\t\r\n\t\t\r\n\t\tvec4 SkinningRead(float id)\r\n\t\t{\r\n\t\t\treturn texture2D(Skinning, vec2(0.0,(id/(SKINNING_TEXTURE_SIZE-1.0))));\r\n\t\t}\r\n\t\t\r\n\t\tmat4 GetSkinMatrix(float b,float o)\r\n\t\t{\r\n\t\t\tvec4 l0, l1, l2;\t\t\t\t\t\t\r\n\t\t\tl0 = SkinningRead(b+o); l1 = SkinningRead(b+1.0+o); l2 = SkinningRead(b+2.0+o);\r\n\t\t\treturn mat4(l0.x, l0.y, l0.z, l0.w, l1.x, l1.y, l1.z, l1.w, l2.x, l2.y, l2.z, l2.w, 0, 0, 0, 1);\t\t\t\r\n\t\t}\r\n\t\t\r\n\t\tmat4 SkinWorldMatrix()\r\n\t\t{\r\n\t\t\tvec4 b = bone * 3.0;\r\n\t\t\tvec4 w = weight;\r\n\t\t\tfloat ivs = 1.0 / (weight.x + weight.y + weight.z + weight.w);\r\n\t\t\tw *= ivs;\r\n\t\t\tmat4 j0 = GetSkinMatrix(b[0],0.0);\r\n\t\t\tmat4 b0 = GetSkinMatrix(b[0],BINDS_OFFSET);\r\n\t\t\tmat4 j1 = GetSkinMatrix(b[1],0.0);\r\n\t\t\tmat4 b1 = GetSkinMatrix(b[1],BINDS_OFFSET);\r\n\t\t\tmat4 j2 = GetSkinMatrix(b[2],0.0);\r\n\t\t\tmat4 b2 = GetSkinMatrix(b[2],BINDS_OFFSET);\r\n\t\t\tmat4 j3 = GetSkinMatrix(b[3],0.0);\r\n\t\t\tmat4 b3 = GetSkinMatrix(b[3],BINDS_OFFSET);\r\n\t\t\t\r\n\t\t\treturn    ((b0 * j0) * w[0])+\r\n\t\t\t          ((b1 * j1) * w[1])+\r\n\t\t\t          ((b2 * j2) * w[2])+\r\n\t\t\t          ((b3 * j3) * w[3]);\r\n\t\t\t\r\n\t\t\t\r\n\t\t}\r\n\t\t\t\t\t\t\r\n\t\tvoid main(void) \r\n\t\t{\t\r\n\t\t\tvec4 lv = vec4(vertex,1.0);\r\n\t\t\tvec3 ln = vec3(normal);\r\n\t\t\tmat4 swm = SkinWorldMatrix();\r\n\t\t\tmat4 wm;\t\t\t\t\t\r\n\t\t\twm = swm;\r\n\t\t\twm = WorldMatrix;\r\n\t\t\t\r\n\t\t\tv_uv0   = uv0;\r\n\t\t\tv_color = color;\t\t\t\r\n\t\t\tv_normal = ln * mat3(WorldMatrixIT);\t\t\t\r\n\t\t\tgl_Position = ((lv * wm) * ViewMatrix) * ProjectionMatrix;\r\n\t\t}\t\t\r\n\t\t</vertex>\r\n\t\t\r\n\t\t<fragment precision=\"high\">\r\n\t\t\t\t\t\r\n\t\t\tuniform sampler2D DiffuseTexture;\t\t\t\r\n\t\t\t\r\n\t\t\tuniform sampler2D Skinning;\r\n\t\t\t\r\n\t\t\tvarying vec3 v_uv0;\r\n\t\t\tvarying vec4 v_color;\r\n\t\t\tvarying vec3 v_normal;\r\n\t\t\t\r\n\t\t\tvoid main(void) \r\n\t\t\t{\t\r\n\t\t\t\tvec4 tex_diffuse = texture2D(DiffuseTexture, v_uv0.xy);\r\n\t\t\t\tgl_FragColor.xyz = v_color.xyz;// tex_diffuse.xyz * v_color.xyz;\r\n\t\t\t\tgl_FragColor.a \t = 1.0;// tex_diffuse.a * v_color.a;\r\n\t\t\t}\r\n\t\t</fragment>\t\r\n\t</shader>\r\n\t";
haxor.context.ShaderContext.gizmo_source = "\r\n\t<shader id=\"haxor/gizmo/Grid\">\t\r\n\t\t<vertex>\t\t\r\n\t\tuniform mat4  WorldMatrix;\r\n\t\tuniform mat4  ViewMatrix;\r\n\t\tuniform mat4  ProjectionMatrix;\t\t\r\n\t\tuniform vec4  Tint;\t\t\r\n\t\tuniform float Area;\r\n\t\tattribute vec3 vertex;\t\t\r\n\t\tattribute vec4 color;\t\t\r\n\t\tvarying vec4 v_color;\t\t\r\n\t\tvoid main(void) \r\n\t\t{\t\t\r\n\t\tgl_Position = ((vec4(vertex*Area, 1.0) * WorldMatrix) * ViewMatrix) * ProjectionMatrix;\t\t\t\t\r\n\t\tv_color = color * Tint;\t\t\r\n\t\t}\t\t\r\n\t\t</vertex>\t\t\r\n\t\t<fragment>\t\t\t\r\n\t\t\tvarying vec4 v_color;\t\t\t\r\n\t\t\tvoid main(void) \r\n\t\t\t{\r\n\t\t\t\tgl_FragColor = v_color;\r\n\t\t\t}\t\t\t\r\n\t\t</fragment>\t\r\n\t</shader>\t\r\n\t";
haxor.context.ShaderContext.texture_source = "\r\n\t<shader id=\"haxor/gizmo/Texture\">\t\r\n\t\t<vertex>\t\t\r\n\t\tuniform vec2  Screen;\r\n\t\tuniform vec4  Rect;\r\n\t\tuniform vec4  Tint;\t\t\r\n\t\tattribute vec3 vertex;\t\t\t\t\r\n\t\tvarying vec4 v_color;\r\n\t\tvarying vec2 v_uv0;\r\n\t\t\r\n\t\tvoid main(void) \r\n\t\t{\t\t\r\n\t\t\tvec4 p = vec4(vertex, 1);\r\n\t\t\tfloat sw = Screen.x * 0.5;\r\n\t\t\tfloat sh = Screen.y * 0.5;\r\n\t\t\tp.x *= Rect.z / sw;\r\n\t\t\tp.y *= Rect.w / sh;\r\n\t\t\tp.x += Rect.x / sw;\r\n\t\t\tp.y -= Rect.y / sh;\t\t\t\r\n\t\t\tp.x -= 1.0;\r\n\t\t\tp.y += 1.0;\t\t\t\r\n\t\t\tp.z = 0.001;\r\n\t\t\tgl_Position = p;\r\n\t\t\tv_color = Tint;\t\t\r\n\t\t\tv_uv0   = vec2(vertex.x,1.0+vertex.y);\r\n\t\t}\t\t\r\n\t\t</vertex>\t\t\r\n\t\t<fragment>\t\t\t\r\n\t\t\tvarying vec4 v_color;\t\r\n\t\t\tvarying vec2 v_uv0;\r\n\t\t\tuniform sampler2D Texture;\t\t\t\r\n\t\t\tvoid main(void) \r\n\t\t\t{\r\n\t\t\t\tgl_FragColor = texture2D(Texture, v_uv0) * v_color;\r\n\t\t\t}\t\t\t\r\n\t\t</fragment>\t\r\n\t</shader>\t\r\n\t";
haxor.core.Console.m_style = "";
haxor.core.Console.verbose = 0;
haxor.core.RenderQueue.Background = 0;
haxor.core.RenderQueue.Opaque = 1000;
haxor.core.RenderQueue.Transparent = 2000;
haxor.core.RenderQueue.Overlay = 3000;
haxor.core.RenderQueue.Interface = 4000;
haxor.core.BlendMode.Zero = 0;
haxor.core.BlendMode.One = 1;
haxor.core.BlendMode.SrcColor = 768;
haxor.core.BlendMode.OneMinusSrcColor = 769;
haxor.core.BlendMode.SrcAlpha = 770;
haxor.core.BlendMode.OneMinusSrcAlpha = 771;
haxor.core.BlendMode.DstAlpha = 772;
haxor.core.BlendMode.OneMinusDstAlpha = 773;
haxor.core.BlendMode.DstColor = 774;
haxor.core.BlendMode.OneMinusDstColor = 775;
haxor.core.BlendMode.SrcAlphaSaturate = 776;
haxor.core.MeshMode.StaticDraw = 35044;
haxor.core.MeshMode.StreamDraw = 35040;
haxor.core.MeshMode.DynamicDraw = 35048;
haxor.core.MeshPrimitive.Points = 0;
haxor.core.MeshPrimitive.Triangles = 4;
haxor.core.MeshPrimitive.TriangleStrip = 5;
haxor.core.MeshPrimitive.TriangleFan = 6;
haxor.core.MeshPrimitive.Lines = 1;
haxor.core.MeshPrimitive.LineLoop = 2;
haxor.core.MeshPrimitive.LineStrip = 3;
haxor.core.CullMode.None = 0;
haxor.core.CullMode.Front = 1;
haxor.core.CullMode.Back = 2;
haxor.core.DepthTest.Never = 512;
haxor.core.DepthTest.Less = 513;
haxor.core.DepthTest.Equal = 514;
haxor.core.DepthTest.LessEqual = 515;
haxor.core.DepthTest.Greater = 516;
haxor.core.DepthTest.NotEqual = 517;
haxor.core.DepthTest.GreaterEqual = 518;
haxor.core.DepthTest.Always = 519;
haxor.core.TextureWrap.ClampX = 1;
haxor.core.TextureWrap.RepeatX = 2;
haxor.core.TextureWrap.ClampY = 4;
haxor.core.TextureWrap.RepeatY = 8;
haxor.core.TextureWrap.ClampZ = 16;
haxor.core.TextureWrap.RepeatZ = 32;
haxor.core.ClearFlag.None = 0;
haxor.core.ClearFlag.Color = 1;
haxor.core.ClearFlag.Depth = 2;
haxor.core.ClearFlag.Skybox = 4;
haxor.core.ClearFlag.ColorDepth = 3;
haxor.core.ClearFlag.SkyboxDepth = 6;
haxor.dom.LayoutFlag.PivotX = 1;
haxor.dom.LayoutFlag.PivotY = 2;
haxor.dom.LayoutFlag.PivotXY = 3;
haxor.dom.LayoutFlag.PositionX = 4;
haxor.dom.LayoutFlag.PositionY = 8;
haxor.dom.LayoutFlag.PositionXY = 12;
haxor.dom.LayoutFlag.SizeX = 16;
haxor.dom.LayoutFlag.SizeY = 32;
haxor.dom.LayoutFlag.SizeXY = 48;
haxor.graphics.GL.ACTIVE_ATTRIBUTES = 35721;
haxor.graphics.GL.ACTIVE_TEXTURE = 34016;
haxor.graphics.GL.ACTIVE_UNIFORMS = 35718;
haxor.graphics.GL.ALIASED_LINE_WIDTH_RANGE = 33902;
haxor.graphics.GL.ALIASED_POINT_SIZE_RANGE = 33901;
haxor.graphics.GL.ALPHA = 6406;
haxor.graphics.GL.ALPHA_BITS = 3413;
haxor.graphics.GL.ALWAYS = 519;
haxor.graphics.GL.ARRAY_BUFFER = 34962;
haxor.graphics.GL.ARRAY_BUFFER_BINDING = 34964;
haxor.graphics.GL.ATTACHED_SHADERS = 35717;
haxor.graphics.GL.BACK = 1029;
haxor.graphics.GL.BLEND = 3042;
haxor.graphics.GL.BLEND_COLOR = 32773;
haxor.graphics.GL.BLEND_DST_ALPHA = 32970;
haxor.graphics.GL.BLEND_DST_RGB = 32968;
haxor.graphics.GL.BLEND_EQUATION = 32777;
haxor.graphics.GL.BLEND_EQUATION_ALPHA = 34877;
haxor.graphics.GL.BLEND_EQUATION_RGB = 32777;
haxor.graphics.GL.BLEND_SRC_ALPHA = 32971;
haxor.graphics.GL.BLEND_SRC_RGB = 32969;
haxor.graphics.GL.BLUE_BITS = 3412;
haxor.graphics.GL.BOOL = 35670;
haxor.graphics.GL.BOOL_VEC2 = 35671;
haxor.graphics.GL.BOOL_VEC3 = 35672;
haxor.graphics.GL.BOOL_VEC4 = 35673;
haxor.graphics.GL.BROWSER_DEFAULT_WEBGL = 37444;
haxor.graphics.GL.BUFFER_SIZE = 34660;
haxor.graphics.GL.BUFFER_USAGE = 34661;
haxor.graphics.GL.BYTE = 5120;
haxor.graphics.GL.CCW = 2305;
haxor.graphics.GL.CLAMP_TO_EDGE = 33071;
haxor.graphics.GL.COLOR_ATTACHMENT0 = 36064;
haxor.graphics.GL.COLOR_BUFFER_BIT = 16384;
haxor.graphics.GL.COLOR_CLEAR_VALUE = 3106;
haxor.graphics.GL.COLOR_WRITEMASK = 3107;
haxor.graphics.GL.COMPILE_STATUS = 35713;
haxor.graphics.GL.COMPRESSED_TEXTURE_FORMATS = 34467;
haxor.graphics.GL.CONSTANT_ALPHA = 32771;
haxor.graphics.GL.CONSTANT_COLOR = 32769;
haxor.graphics.GL.CONTEXT_LOST_WEBGL = 37442;
haxor.graphics.GL.CULL_FACE = 2884;
haxor.graphics.GL.CULL_FACE_MODE = 2885;
haxor.graphics.GL.CURRENT_PROGRAM = 35725;
haxor.graphics.GL.CURRENT_VERTEX_ATTRIB = 34342;
haxor.graphics.GL.CW = 2304;
haxor.graphics.GL.DECR = 7683;
haxor.graphics.GL.DECR_WRAP = 34056;
haxor.graphics.GL.DELETE_STATUS = 35712;
haxor.graphics.GL.DEPTH_ATTACHMENT = 36096;
haxor.graphics.GL.DEPTH_BITS = 3414;
haxor.graphics.GL.DEPTH_BUFFER_BIT = 256;
haxor.graphics.GL.DEPTH_CLEAR_VALUE = 2931;
haxor.graphics.GL.DEPTH_COMPONENT = 6402;
haxor.graphics.GL.DEPTH_COMPONENT16 = 33189;
haxor.graphics.GL.DEPTH_FUNC = 2932;
haxor.graphics.GL.DEPTH_RANGE = 2928;
haxor.graphics.GL.DEPTH_STENCIL = 34041;
haxor.graphics.GL.DEPTH_STENCIL_ATTACHMENT = 33306;
haxor.graphics.GL.DEPTH_TEST = 2929;
haxor.graphics.GL.DEPTH_WRITEMASK = 2930;
haxor.graphics.GL.DITHER = 3024;
haxor.graphics.GL.DONT_CARE = 4352;
haxor.graphics.GL.DST_ALPHA = 772;
haxor.graphics.GL.DST_COLOR = 774;
haxor.graphics.GL.DYNAMIC_DRAW = 35048;
haxor.graphics.GL.ELEMENT_ARRAY_BUFFER = 34963;
haxor.graphics.GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
haxor.graphics.GL.EQUAL = 514;
haxor.graphics.GL.FASTEST = 4353;
haxor.graphics.GL.FLOAT = 5126;
haxor.graphics.GL.FLOAT_MAT2 = 35674;
haxor.graphics.GL.FLOAT_MAT3 = 35675;
haxor.graphics.GL.FLOAT_MAT4 = 35676;
haxor.graphics.GL.FLOAT_VEC2 = 35664;
haxor.graphics.GL.FLOAT_VEC3 = 35665;
haxor.graphics.GL.FLOAT_VEC4 = 35666;
haxor.graphics.GL.FRAGMENT_SHADER = 35632;
haxor.graphics.GL.FRAMEBUFFER = 36160;
haxor.graphics.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
haxor.graphics.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
haxor.graphics.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
haxor.graphics.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
haxor.graphics.GL.FRAMEBUFFER_BINDING = 36006;
haxor.graphics.GL.FRAMEBUFFER_COMPLETE = 36053;
haxor.graphics.GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
haxor.graphics.GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
haxor.graphics.GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
haxor.graphics.GL.FRAMEBUFFER_UNSUPPORTED = 36061;
haxor.graphics.GL.FRONT = 1028;
haxor.graphics.GL.FRONT_AND_BACK = 1032;
haxor.graphics.GL.FRONT_FACE = 2886;
haxor.graphics.GL.FUNC_ADD = 32774;
haxor.graphics.GL.FUNC_REVERSE_SUBTRACT = 32779;
haxor.graphics.GL.FUNC_SUBTRACT = 32778;
haxor.graphics.GL.GENERATE_MIPMAP_HINT = 33170;
haxor.graphics.GL.GEQUAL = 518;
haxor.graphics.GL.GREATER = 516;
haxor.graphics.GL.GREEN_BITS = 3411;
haxor.graphics.GL.HIGH_FLOAT = 36338;
haxor.graphics.GL.HIGH_INT = 36341;
haxor.graphics.GL.INCR = 7682;
haxor.graphics.GL.INCR_WRAP = 34055;
haxor.graphics.GL.INT = 5124;
haxor.graphics.GL.INT_VEC2 = 35667;
haxor.graphics.GL.INT_VEC3 = 35668;
haxor.graphics.GL.INT_VEC4 = 35669;
haxor.graphics.GL.INVALID_ENUM = 1280;
haxor.graphics.GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
haxor.graphics.GL.INVALID_OPERATION = 1282;
haxor.graphics.GL.INVALID_VALUE = 1281;
haxor.graphics.GL.INVERT = 5386;
haxor.graphics.GL.KEEP = 7680;
haxor.graphics.GL.LEQUAL = 515;
haxor.graphics.GL.LESS = 513;
haxor.graphics.GL.LINEAR = 9729;
haxor.graphics.GL.LINEAR_MIPMAP_LINEAR = 9987;
haxor.graphics.GL.LINEAR_MIPMAP_NEAREST = 9985;
haxor.graphics.GL.LINES = 1;
haxor.graphics.GL.LINE_LOOP = 2;
haxor.graphics.GL.LINE_STRIP = 3;
haxor.graphics.GL.LINE_WIDTH = 2849;
haxor.graphics.GL.LINK_STATUS = 35714;
haxor.graphics.GL.LOW_FLOAT = 36336;
haxor.graphics.GL.LOW_INT = 36339;
haxor.graphics.GL.LUMINANCE = 6409;
haxor.graphics.GL.LUMINANCE_ALPHA = 6410;
haxor.graphics.GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
haxor.graphics.GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
haxor.graphics.GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
haxor.graphics.GL.MAX_RENDERBUFFER_SIZE = 34024;
haxor.graphics.GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
haxor.graphics.GL.MAX_TEXTURE_SIZE = 3379;
haxor.graphics.GL.MAX_VARYING_VECTORS = 36348;
haxor.graphics.GL.MAX_VERTEX_ATTRIBS = 34921;
haxor.graphics.GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
haxor.graphics.GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
haxor.graphics.GL.MAX_VIEWPORT_DIMS = 3386;
haxor.graphics.GL.MEDIUM_FLOAT = 36337;
haxor.graphics.GL.MEDIUM_INT = 36340;
haxor.graphics.GL.MIRRORED_REPEAT = 33648;
haxor.graphics.GL.NEAREST = 9728;
haxor.graphics.GL.NEAREST_MIPMAP_LINEAR = 9986;
haxor.graphics.GL.NEAREST_MIPMAP_NEAREST = 9984;
haxor.graphics.GL.NEVER = 512;
haxor.graphics.GL.NICEST = 4354;
haxor.graphics.GL.NONE = 0;
haxor.graphics.GL.NOTEQUAL = 517;
haxor.graphics.GL.NO_ERROR_GL = 0;
haxor.graphics.GL.ONE = 1;
haxor.graphics.GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
haxor.graphics.GL.ONE_MINUS_CONSTANT_COLOR = 32770;
haxor.graphics.GL.ONE_MINUS_DST_ALPHA = 773;
haxor.graphics.GL.ONE_MINUS_DST_COLOR = 775;
haxor.graphics.GL.ONE_MINUS_SRC_ALPHA = 771;
haxor.graphics.GL.ONE_MINUS_SRC_COLOR = 769;
haxor.graphics.GL.OUT_OF_MEMORY = 1285;
haxor.graphics.GL.PACK_ALIGNMENT = 3333;
haxor.graphics.GL.POINTS = 0;
haxor.graphics.GL.POLYGON_OFFSET_FACTOR = 32824;
haxor.graphics.GL.POLYGON_OFFSET_FILL = 32823;
haxor.graphics.GL.POLYGON_OFFSET_UNITS = 10752;
haxor.graphics.GL.RED_BITS = 3410;
haxor.graphics.GL.RENDERBUFFER = 36161;
haxor.graphics.GL.RENDERBUFFER_ALPHA_SIZE = 36179;
haxor.graphics.GL.RENDERBUFFER_BINDING = 36007;
haxor.graphics.GL.RENDERBUFFER_BLUE_SIZE = 36178;
haxor.graphics.GL.RENDERBUFFER_DEPTH_SIZE = 36180;
haxor.graphics.GL.RENDERBUFFER_GREEN_SIZE = 36177;
haxor.graphics.GL.RENDERBUFFER_HEIGHT = 36163;
haxor.graphics.GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
haxor.graphics.GL.RENDERBUFFER_RED_SIZE = 36176;
haxor.graphics.GL.RENDERBUFFER_STENCIL_SIZE = 36181;
haxor.graphics.GL.RENDERBUFFER_WIDTH = 36162;
haxor.graphics.GL.RENDERER = 7937;
haxor.graphics.GL.REPEAT = 10497;
haxor.graphics.GL.REPLACE = 7681;
haxor.graphics.GL.RGB = 6407;
haxor.graphics.GL.RGB565 = 36194;
haxor.graphics.GL.RGB5_A1 = 32855;
haxor.graphics.GL.RGBA = 6408;
haxor.graphics.GL.RGBA4 = 32854;
haxor.graphics.GL.SAMPLER_2D = 35678;
haxor.graphics.GL.SAMPLER_CUBE = 35680;
haxor.graphics.GL.SAMPLES = 32937;
haxor.graphics.GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
haxor.graphics.GL.SAMPLE_BUFFERS = 32936;
haxor.graphics.GL.SAMPLE_COVERAGE = 32928;
haxor.graphics.GL.SAMPLE_COVERAGE_INVERT = 32939;
haxor.graphics.GL.SAMPLE_COVERAGE_VALUE = 32938;
haxor.graphics.GL.SCISSOR_BOX = 3088;
haxor.graphics.GL.SCISSOR_TEST = 3089;
haxor.graphics.GL.SHADER_TYPE = 35663;
haxor.graphics.GL.SHADING_LANGUAGE_VERSION = 35724;
haxor.graphics.GL.SHORT = 5122;
haxor.graphics.GL.SRC_ALPHA = 770;
haxor.graphics.GL.SRC_ALPHA_SATURATE = 776;
haxor.graphics.GL.SRC_COLOR = 768;
haxor.graphics.GL.STATIC_DRAW = 35044;
haxor.graphics.GL.STENCIL_ATTACHMENT = 36128;
haxor.graphics.GL.STENCIL_BACK_FAIL = 34817;
haxor.graphics.GL.STENCIL_BACK_FUNC = 34816;
haxor.graphics.GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
haxor.graphics.GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
haxor.graphics.GL.STENCIL_BACK_REF = 36003;
haxor.graphics.GL.STENCIL_BACK_VALUE_MASK = 36004;
haxor.graphics.GL.STENCIL_BACK_WRITEMASK = 36005;
haxor.graphics.GL.STENCIL_BITS = 3415;
haxor.graphics.GL.STENCIL_BUFFER_BIT = 1024;
haxor.graphics.GL.STENCIL_CLEAR_VALUE = 2961;
haxor.graphics.GL.STENCIL_FAIL = 2964;
haxor.graphics.GL.STENCIL_FUNC = 2962;
haxor.graphics.GL.STENCIL_INDEX = 6401;
haxor.graphics.GL.STENCIL_INDEX8 = 36168;
haxor.graphics.GL.STENCIL_PASS_DEPTH_FAIL = 2965;
haxor.graphics.GL.STENCIL_PASS_DEPTH_PASS = 2966;
haxor.graphics.GL.STENCIL_REF = 2967;
haxor.graphics.GL.STENCIL_TEST = 2960;
haxor.graphics.GL.STENCIL_VALUE_MASK = 2963;
haxor.graphics.GL.STENCIL_WRITEMASK = 2968;
haxor.graphics.GL.STREAM_DRAW = 35040;
haxor.graphics.GL.SUBPIXEL_BITS = 3408;
haxor.graphics.GL.TEXTURE = 5890;
haxor.graphics.GL.TEXTURE0 = 33984;
haxor.graphics.GL.TEXTURE1 = 33985;
haxor.graphics.GL.TEXTURE10 = 33994;
haxor.graphics.GL.TEXTURE11 = 33995;
haxor.graphics.GL.TEXTURE12 = 33996;
haxor.graphics.GL.TEXTURE13 = 33997;
haxor.graphics.GL.TEXTURE14 = 33998;
haxor.graphics.GL.TEXTURE15 = 33999;
haxor.graphics.GL.TEXTURE16 = 34000;
haxor.graphics.GL.TEXTURE17 = 34001;
haxor.graphics.GL.TEXTURE18 = 34002;
haxor.graphics.GL.TEXTURE19 = 34003;
haxor.graphics.GL.TEXTURE2 = 33986;
haxor.graphics.GL.TEXTURE20 = 34004;
haxor.graphics.GL.TEXTURE21 = 34005;
haxor.graphics.GL.TEXTURE22 = 34006;
haxor.graphics.GL.TEXTURE23 = 34007;
haxor.graphics.GL.TEXTURE24 = 34008;
haxor.graphics.GL.TEXTURE25 = 34009;
haxor.graphics.GL.TEXTURE26 = 34010;
haxor.graphics.GL.TEXTURE27 = 34011;
haxor.graphics.GL.TEXTURE28 = 34012;
haxor.graphics.GL.TEXTURE29 = 34013;
haxor.graphics.GL.TEXTURE3 = 33987;
haxor.graphics.GL.TEXTURE30 = 34014;
haxor.graphics.GL.TEXTURE31 = 34015;
haxor.graphics.GL.TEXTURE4 = 33988;
haxor.graphics.GL.TEXTURE5 = 33989;
haxor.graphics.GL.TEXTURE6 = 33990;
haxor.graphics.GL.TEXTURE7 = 33991;
haxor.graphics.GL.TEXTURE8 = 33992;
haxor.graphics.GL.TEXTURE9 = 33993;
haxor.graphics.GL.TEXTURE_2D = 3553;
haxor.graphics.GL.TEXTURE_BINDING_2D = 32873;
haxor.graphics.GL.TEXTURE_BINDING_CUBE_MAP = 34068;
haxor.graphics.GL.TEXTURE_CUBE_MAP = 34067;
haxor.graphics.GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
haxor.graphics.GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
haxor.graphics.GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
haxor.graphics.GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
haxor.graphics.GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
haxor.graphics.GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
haxor.graphics.GL.TEXTURE_MAG_FILTER = 10240;
haxor.graphics.GL.TEXTURE_MIN_FILTER = 10241;
haxor.graphics.GL.TEXTURE_WRAP_S = 10242;
haxor.graphics.GL.TEXTURE_WRAP_T = 10243;
haxor.graphics.GL.TRIANGLES = 4;
haxor.graphics.GL.TRIANGLE_FAN = 6;
haxor.graphics.GL.TRIANGLE_STRIP = 5;
haxor.graphics.GL.UNPACK_ALIGNMENT = 3317;
haxor.graphics.GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
haxor.graphics.GL.UNPACK_FLIP_Y_WEBGL = 37440;
haxor.graphics.GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
haxor.graphics.GL.UNSIGNED_BYTE = 5121;
haxor.graphics.GL.UNSIGNED_INT = 5125;
haxor.graphics.GL.UNSIGNED_SHORT = 5123;
haxor.graphics.GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
haxor.graphics.GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
haxor.graphics.GL.UNSIGNED_SHORT_5_6_5 = 33635;
haxor.graphics.GL.VALIDATE_STATUS = 35715;
haxor.graphics.GL.VENDOR = 7936;
haxor.graphics.GL.VERSION = 7938;
haxor.graphics.GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
haxor.graphics.GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
haxor.graphics.GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
haxor.graphics.GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
haxor.graphics.GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
haxor.graphics.GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
haxor.graphics.GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
haxor.graphics.GL.VERTEX_SHADER = 35633;
haxor.graphics.GL.VIEWPORT = 2978;
haxor.graphics.GL.ZERO = 0;
haxor.graphics.GL.VERTEX_ARRAY_OBJECT = false;
haxor.graphics.GL.HALF_FLOAT = 5126;
haxor.graphics.GL.TEXTURE_HALF = false;
haxor.graphics.GL.TEXTURE_HALF_LINEAR = false;
haxor.graphics.GL.TEXTURE_ANISOTROPY = -1;
haxor.graphics.GL.TEXTURE_ANISOTROPY_ENABLED = false;
haxor.graphics.GL.MAX_TEXTURE_ANISOTROPY = 1;
haxor.graphics.GL.TEXTURE_FLOAT = false;
haxor.graphics.GL.TEXTURE_FLOAT_LINEAR = false;
haxor.graphics.GL.TEXTURE_DEPTH_ENABLED = false;
haxor.graphics.GL.MAX_ACTIVE_TEXTURE = 8;
haxor.graphics.Graphics.m_last_viewport = haxor.math.AABB2.get_empty();
haxor.input.Input.scroll = false;
haxor.input.Input.menu = false;
haxor.input.Input.emulateTouch = false;
haxor.input.Joystick.analogBias = [0.1,0.9];
haxor.input.Joystick.buttonBias = 0.9;
haxor.input.Joystick.available = false;
haxor.input.KeyCode.Modifiers = -65536;
haxor.input.KeyCode.None = 0;
haxor.input.KeyCode.Mouse0 = 1;
haxor.input.KeyCode.Mouse1 = 2;
haxor.input.KeyCode.Cancel = 3;
haxor.input.KeyCode.Mouse2 = 4;
haxor.input.KeyCode.Mouse3 = 5;
haxor.input.KeyCode.Mouse4 = 6;
haxor.input.KeyCode.Back = 8;
haxor.input.KeyCode.Tab = 9;
haxor.input.KeyCode.LineFeed = 10;
haxor.input.KeyCode.Clear = 12;
haxor.input.KeyCode.Enter = 13;
haxor.input.KeyCode.Return = 13;
haxor.input.KeyCode.ShiftKey = 16;
haxor.input.KeyCode.ControlKey = 17;
haxor.input.KeyCode.Alt = 18;
haxor.input.KeyCode.Pause = 19;
haxor.input.KeyCode.CapsLock = 20;
haxor.input.KeyCode.Capital = 20;
haxor.input.KeyCode.KanaMode = 21;
haxor.input.KeyCode.HanguelMode = 21;
haxor.input.KeyCode.HangulMode = 21;
haxor.input.KeyCode.JunjaMode = 23;
haxor.input.KeyCode.FinalMode = 24;
haxor.input.KeyCode.KanjiMode = 25;
haxor.input.KeyCode.HanjaMode = 25;
haxor.input.KeyCode.Escape = 27;
haxor.input.KeyCode.IMEConvert = 28;
haxor.input.KeyCode.IMENonconvert = 29;
haxor.input.KeyCode.IMEAceept = 30;
haxor.input.KeyCode.IMEAccept = 30;
haxor.input.KeyCode.IMEModeChange = 31;
haxor.input.KeyCode.Space = 32;
haxor.input.KeyCode.Prior = 33;
haxor.input.KeyCode.PageUp = 33;
haxor.input.KeyCode.Next = 34;
haxor.input.KeyCode.PageDown = 34;
haxor.input.KeyCode.End = 35;
haxor.input.KeyCode.Home = 36;
haxor.input.KeyCode.Left = 37;
haxor.input.KeyCode.Up = 38;
haxor.input.KeyCode.Right = 39;
haxor.input.KeyCode.Down = 40;
haxor.input.KeyCode.Select = 41;
haxor.input.KeyCode.Print = 42;
haxor.input.KeyCode.Execute = 43;
haxor.input.KeyCode.PrintScreen = 44;
haxor.input.KeyCode.Snapshot = 44;
haxor.input.KeyCode.Insert = 45;
haxor.input.KeyCode.Delete = 46;
haxor.input.KeyCode.Help = 47;
haxor.input.KeyCode.D0 = 48;
haxor.input.KeyCode.D1 = 49;
haxor.input.KeyCode.D2 = 50;
haxor.input.KeyCode.D3 = 51;
haxor.input.KeyCode.D4 = 52;
haxor.input.KeyCode.D5 = 53;
haxor.input.KeyCode.D6 = 54;
haxor.input.KeyCode.D7 = 55;
haxor.input.KeyCode.D8 = 56;
haxor.input.KeyCode.D9 = 57;
haxor.input.KeyCode.A = 65;
haxor.input.KeyCode.B = 66;
haxor.input.KeyCode.C = 67;
haxor.input.KeyCode.D = 68;
haxor.input.KeyCode.E = 69;
haxor.input.KeyCode.F = 70;
haxor.input.KeyCode.G = 71;
haxor.input.KeyCode.H = 72;
haxor.input.KeyCode.I = 73;
haxor.input.KeyCode.J = 74;
haxor.input.KeyCode.K = 75;
haxor.input.KeyCode.L = 76;
haxor.input.KeyCode.M = 77;
haxor.input.KeyCode.N = 78;
haxor.input.KeyCode.O = 79;
haxor.input.KeyCode.P = 80;
haxor.input.KeyCode.Q = 81;
haxor.input.KeyCode.R = 82;
haxor.input.KeyCode.S = 83;
haxor.input.KeyCode.T = 84;
haxor.input.KeyCode.U = 85;
haxor.input.KeyCode.V = 86;
haxor.input.KeyCode.W = 87;
haxor.input.KeyCode.X = 88;
haxor.input.KeyCode.Y = 89;
haxor.input.KeyCode.Z = 90;
haxor.input.KeyCode.LWin = 91;
haxor.input.KeyCode.RWin = 92;
haxor.input.KeyCode.Apps = 93;
haxor.input.KeyCode.Sleep = 95;
haxor.input.KeyCode.NumPad0 = 96;
haxor.input.KeyCode.NumPad1 = 97;
haxor.input.KeyCode.NumPad2 = 98;
haxor.input.KeyCode.NumPad3 = 99;
haxor.input.KeyCode.NumPad4 = 100;
haxor.input.KeyCode.NumPad5 = 101;
haxor.input.KeyCode.NumPad6 = 102;
haxor.input.KeyCode.NumPad7 = 103;
haxor.input.KeyCode.NumPad8 = 104;
haxor.input.KeyCode.NumPad9 = 105;
haxor.input.KeyCode.Multiply = 106;
haxor.input.KeyCode.Add = 107;
haxor.input.KeyCode.Separator = 108;
haxor.input.KeyCode.Subtract = 109;
haxor.input.KeyCode.Decimal = 110;
haxor.input.KeyCode.Divide = 111;
haxor.input.KeyCode.F1 = 112;
haxor.input.KeyCode.F2 = 113;
haxor.input.KeyCode.F3 = 114;
haxor.input.KeyCode.F4 = 115;
haxor.input.KeyCode.F5 = 116;
haxor.input.KeyCode.F6 = 117;
haxor.input.KeyCode.F7 = 118;
haxor.input.KeyCode.F8 = 119;
haxor.input.KeyCode.F9 = 120;
haxor.input.KeyCode.F10 = 121;
haxor.input.KeyCode.F11 = 122;
haxor.input.KeyCode.F12 = 123;
haxor.input.KeyCode.F13 = 124;
haxor.input.KeyCode.F14 = 125;
haxor.input.KeyCode.F15 = 126;
haxor.input.KeyCode.F16 = 127;
haxor.input.KeyCode.F17 = 128;
haxor.input.KeyCode.F18 = 129;
haxor.input.KeyCode.F19 = 130;
haxor.input.KeyCode.F20 = 131;
haxor.input.KeyCode.F21 = 132;
haxor.input.KeyCode.F22 = 133;
haxor.input.KeyCode.F23 = 134;
haxor.input.KeyCode.F24 = 135;
haxor.input.KeyCode.NumLock = 144;
haxor.input.KeyCode.Scroll = 145;
haxor.input.KeyCode.LShiftKey = 160;
haxor.input.KeyCode.RShiftKey = 161;
haxor.input.KeyCode.LControlKey = 162;
haxor.input.KeyCode.RControlKey = 163;
haxor.input.KeyCode.LAlt = 164;
haxor.input.KeyCode.RAlt = 165;
haxor.input.KeyCode.BrowserBack = 166;
haxor.input.KeyCode.BrowserForward = 167;
haxor.input.KeyCode.BrowserRefresh = 168;
haxor.input.KeyCode.BrowserStop = 169;
haxor.input.KeyCode.BrowserSearch = 170;
haxor.input.KeyCode.BrowserFavorites = 171;
haxor.input.KeyCode.BrowserHome = 172;
haxor.input.KeyCode.VolumeMute = 173;
haxor.input.KeyCode.VolumeDown = 174;
haxor.input.KeyCode.VolumeUp = 175;
haxor.input.KeyCode.MediaNextTrack = 176;
haxor.input.KeyCode.MediaPreviousTrack = 177;
haxor.input.KeyCode.MediaStop = 178;
haxor.input.KeyCode.MediaPlayPause = 179;
haxor.input.KeyCode.LaunchMail = 180;
haxor.input.KeyCode.SelectMedia = 181;
haxor.input.KeyCode.LaunchApplication1 = 182;
haxor.input.KeyCode.LaunchApplication2 = 183;
haxor.input.KeyCode.Oem1 = 186;
haxor.input.KeyCode.OemSemicolon = 186;
haxor.input.KeyCode.Oemplus = 187;
haxor.input.KeyCode.Oemcomma = 188;
haxor.input.KeyCode.OemMinus = 189;
haxor.input.KeyCode.OemPeriod = 190;
haxor.input.KeyCode.OemQuestion = 191;
haxor.input.KeyCode.Oem2 = 191;
haxor.input.KeyCode.Oemtilde = 192;
haxor.input.KeyCode.Oem3 = 192;
haxor.input.KeyCode.Oem4 = 219;
haxor.input.KeyCode.OemOpenBrackets = 219;
haxor.input.KeyCode.OemPipe = 220;
haxor.input.KeyCode.Oem5 = 220;
haxor.input.KeyCode.Oem6 = 221;
haxor.input.KeyCode.OemCloseBrackets = 221;
haxor.input.KeyCode.Oem7 = 222;
haxor.input.KeyCode.OemQuotes = 222;
haxor.input.KeyCode.Oem8 = 223;
haxor.input.KeyCode.Oem102 = 226;
haxor.input.KeyCode.OemBackslash = 226;
haxor.input.KeyCode.ProcessKey = 229;
haxor.input.KeyCode.Packet = 231;
haxor.input.KeyCode.Attn = 246;
haxor.input.KeyCode.Crsel = 247;
haxor.input.KeyCode.Exsel = 248;
haxor.input.KeyCode.EraseEof = 249;
haxor.input.KeyCode.Play = 250;
haxor.input.KeyCode.Zoom = 251;
haxor.input.KeyCode.NoName = 252;
haxor.input.KeyCode.Pa1 = 253;
haxor.input.KeyCode.OemClear = 254;
haxor.input.KeyCode.KeyCodeMask = 65535;
haxor.input.KeyCode.ShiftModifier = 65536;
haxor.input.KeyCode.ControlModifier = 131072;
haxor.input.KeyCode.AltModifier = 262144;
haxor.input.KeyCode.Face1 = 0;
haxor.input.KeyCode.Face2 = 1;
haxor.input.KeyCode.Face3 = 2;
haxor.input.KeyCode.Face4 = 3;
haxor.input.KeyCode.ButtonA = 0;
haxor.input.KeyCode.ButtonB = 1;
haxor.input.KeyCode.ButtonX = 2;
haxor.input.KeyCode.ButtonY = 3;
haxor.input.KeyCode.LeftShoulder = 4;
haxor.input.KeyCode.RightShoulder = 5;
haxor.input.KeyCode.LeftShoulderBottom = 6;
haxor.input.KeyCode.RightShoulderBottom = 7;
haxor.input.KeyCode.ButtonSelect = 8;
haxor.input.KeyCode.ButtonStart = 9;
haxor.input.KeyCode.LeftAnalogueStick = 10;
haxor.input.KeyCode.RightAnalogueStick = 11;
haxor.input.KeyCode.PadTop = 12;
haxor.input.KeyCode.PadBottom = 13;
haxor.input.KeyCode.PadLeft = 14;
haxor.input.KeyCode.PadRight = 15;
haxor.input.KeyCode.LeftAnalogueHor = 0;
haxor.input.KeyCode.LeftAnalogueVert = 1;
haxor.input.KeyCode.RightAnalogueHor = 2;
haxor.input.KeyCode.RightAnalogueVert = 3;
haxor.io.file.Asset.m_database = new haxe.ds.StringMap();
haxor.math.Mathf.Epsilon = 0.0001;
haxor.math.Mathf.NaN = Math.NaN;
haxor.math.Mathf.Infinity = Math.POSITIVE_INFINITY;
haxor.math.Mathf.NegativeInfinity = Math.NEGATIVE_INFINITY;
haxor.math.Mathf.E = 2.7182818284590452353602874713527;
haxor.math.Mathf.PI = 3.1415926535897932384626433832795028841971693993751058;
haxor.math.Mathf.HalfPI = 1.5707963267948966192313216916398;
haxor.math.Mathf.PI2 = 6.283185307179586476925286766559;
haxor.math.Mathf.PI4 = 12.566370614359172953850573533118;
haxor.math.Mathf.InvPI = 0.31830988618379067153776752674503;
haxor.math.Mathf.Rad2Deg = 57.295779513082320876798154814105;
haxor.math.Mathf.Deg2Rad = 0.01745329251994329576923690768489;
haxor.math.Mathf.Px2Em = 0.063;
haxor.math.Mathf.Em2Px = 15.87301587301587;
haxor.math.Mathf.Byte2Float = 0.00392156863;
haxor.math.Mathf.Short2Float = 0.0000152587890625;
haxor.math.Mathf.Long2Float = 0.00000000023283064365386962890625;
haxor.math.Mathf.Float2Byte = 255.0;
haxor.math.Mathf.Float2Short = 65536.0;
haxor.math.Mathf.Float2Long = 4294967296.0;
me.client.App.main();
})();
