$(function() {

	// 切换选项卡
	$('.tab').on('click', function() {
		$('.tab').removeClass('active');
		$(this).addClass('active');
	});


	/**************************** JSON 格式化 *******************************/

	var sourceTextArea = CodeMirror.fromTextArea($('#code-source')[0], {
	  lineNumbers: true,
	  tabSize: 4
	});

	var targetTextArea = CodeMirror.fromTextArea($('#code-target')[0], {
	  lineNumbers: true,
	  tabSize: 4
	});

	// 点击 JSON 选项卡
	$('#json-tab').on('click', function() {
		$('.content-head-section').removeClass('active');
		$('.content-section').removeClass('active');
		$('.json-content-head-section').addClass('active');
		$('.code-content-section').addClass('active');
	});

	// 格式化
	$('#format-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 4);
			targetTextArea.setValue(targetText);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue('JSON格式不正确！');
		}
	});

	// 压缩
	$('#compress-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 0);
			targetTextArea.setValue(targetText);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue('JSON格式不正确！');
		}
	});

	// 压缩转义
	$('#compress-and-escape-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 0);
			targetText = JSON.stringify(targetText);
			targetTextArea.setValue(targetText);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue('JSON格式不正确！');
		}
	});

	// 去除转义
	$('#remove-escape-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		try {
			let sourceObj = JSON.parse(sourceText);
			targetTextArea.setValue(sourceObj);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue('JSON格式不正确！');
		}
	});

	// 去除注释
	$('#remove-explain-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		sourceText = sourceText.replace(/\/\/.*/g, '');
		sourceText = sourceText.replace(/\/\*.*\*\//g, '');
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 4);
			targetTextArea.setValue(targetText);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue(sourceText + '\n============================================\nJSON格式不正确，但已帮你去除注释！');
			alert("JSON格式不正确，但已帮你去除注释！");
		}
	});

	// 转XML
	$('#json-to-xml-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = jsonToXml(sourceObj);
			targetTextArea.setValue(targetText);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue('JSON格式不正确！');
		}
	});

	function jsonToXml(jsonObj) {
		let xmlDocument = new XmlDocument();
		if (typeof jsonObj === 'object') {
			objToXmlElement(jsonObj, xmlDocument);
		} else if (typeof jsonObj === 'array') {
			arrayToXmlElement(jsonObj, xmlDocument);
		}
		return xmlDocument.toXmlString();
	}

	function arrayToXmlElement(arr, xmlDocument, parentXmlElement) {
		for (let i = 0; i < arr.length; i++) {
			let xmlElement = new XmlElement(i);
			if (parentXmlElement) {
				parentXmlElement.addChild(xmlElement);
				xmlElement.setLevel(parentXmlElement.getLevel() + 1);
			} else {
				xmlElement.setLevel(0);
			}
			if (typeof arr[i] === 'object') {
				objToXmlElement(arr[i], xmlDocument, xmlElement);
			} else {
				xmlElement.setValue(arr[i]);
			}
			xmlDocument.addElement(xmlElement);
		}
	}

	function objToXmlElement(obj, xmlDocument, parentXmlElement) {
		for (let name in obj) {
			let xmlElement = new XmlElement(name);
			if (parentXmlElement) {
				parentXmlElement.addChild(xmlElement);
				xmlElement.setLevel(parentXmlElement.getLevel() + 1);
			} else {
				xmlElement.setLevel(0);
			}
			if (typeof obj[name] === 'array') {
				arrayToXmlElement(obj[name], xmlDocument, xmlElement);
			} else if (typeof obj[name] === 'object') {
				objToXmlElement(obj[name], xmlDocument, xmlElement);
			} else {
				xmlElement.setValue(obj[name]);
			}
			xmlDocument.addElement(xmlElement);
		}
	}

	class XmlDocument {

		constructor(option) {
			this.elements = new Array();
			this._hasDefaultRoot = false;
			this.option = {
				tabSize: 4,
				pretty: true,
				hasDefaultRoot: true,
				newLineChar: '\n',
				rootName: 'xml'
			};
			if (option) {
				Object.assign(this.option, option);
			}
		}

		addElement(xmlElement) {
			this.elements.push(xmlElement);
		}

		toXmlString() {
			let rootElement = this._getAndSetRootElement();
			return this._parseXml(rootElement);
		}

		_parseXml(xmlElement) {
			if (!xmlElement) {
				return "";
			}
			let children = xmlElement.getChildren();
			let childrenXml = this.option.newLineChar;
			if (children.length > 0) {
				for (let i = 0; i < children.length; i++) {
					childrenXml += this._parseXml(children[i]);
				}
				childrenXml += this._tab(xmlElement.getLevel());
			} else {
				childrenXml = xmlElement.getValue() === null ? '' : this._cdata(xmlElement.getValue()); 
			}
			return this._xmlTag(xmlElement.getName(), childrenXml, xmlElement.getLevel());
		}

		_getAndSetRootElement() {
			let rootElements = new Array();
			for (let i = 0; i < this.elements.length; i++) {
				if (this.elements[i].getLevel() === 0) {
					rootElements.push(this.elements[i]);
				}
			}
			if (rootElements.length == 1) {
				let rootElement = rootElements[0];
				if (this.option.hasDefaultRoot) {
					 rootElement = new XmlElement(this.option.rootName);
					 rootElement.addChild(rootElements[0]);
					 rootElement.setLevel(-1);
					 this._hasDefaultRoot = true;
				}
				return rootElement;
			} else if (rootElements.length > 1) {
				let rootElement = new XmlElement(this.option.rootName);
				rootElement.setChildren(rootElements);
				rootElement.setLevel(-1);
				this._hasDefaultRoot = true;
				return rootElement;
			} else {
				return null;
			}
		}

		_xmlTag(name, value, level) {
			return this._tab(level) + '<' + name + '>' + value + '</' + name + '>' + this.option.newLineChar;
		}

		_tab(num) {
			if (this._hasDefaultRoot) {
				num++;
			}
			let str = '';
			for (let i = 0; i < this.option.tabSize * num; i++) {
				str += ' ';
			}
			return str;
		}

		_cdata(value) {
			if (typeof value === 'string') {
				let reg = /[<>&'"]/;
				if (value.search(reg) > -1) {
					return "<![CDATA[" + value + "]]>";
				}
			}
			return value;
		}

	}

	class XmlElement {

		constructor(name, value) {
			this.name = name;
			this.value = value;
			this.children = new Array();
			this.level = 0;
		}

		addChild(xmlElement) {
			this.children.push(xmlElement);
		}

		setChildren(xmlElements) {
			this.children = xmlElements;
		}

		getChildren() {
			return this.children;
		}

		setLevel(level) {
			this.level = level;
		}

		getLevel() {
			return this.level;
		}

		getName() {
			return this.name;
		}

		setValue(value) {
			this.value = value;
		}

		getValue() {
			return this.value;
		}

	}

});