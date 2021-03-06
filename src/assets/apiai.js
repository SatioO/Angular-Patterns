var ApiAi = (function(e) {
	function __webpack_require__(n) {
		if (t[n]) return t[n].exports;
		var i = (t[n] = { i: n, l: !1, exports: {} });
		return (
			e[n].call(i.exports, i, i.exports, __webpack_require__),
			(i.l = !0),
			i.exports
		);
	}
	var t = {};
	return (
		(__webpack_require__.m = e),
		(__webpack_require__.c = t),
		(__webpack_require__.i = function(e) {
			return e;
		}),
		(__webpack_require__.d = function(e, t, n) {
			__webpack_require__.o(e, t) ||
				Object.defineProperty(e, t, {
					configurable: !1,
					enumerable: !0,
					get: n
				});
		}),
		(__webpack_require__.n = function(e) {
			var t =
				e && e.__esModule
					? function getDefault() {
							return e.default;
						}
					: function getModuleExports() {
							return e;
						};
			return __webpack_require__.d(t, "a", t), t;
		}),
		(__webpack_require__.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(__webpack_require__.p = "/target/"),
		__webpack_require__((__webpack_require__.s = 16))
	);
})([
	function(e, t, n) {
		"use strict";
		var i =
				(this && this.__extends) ||
				function(e, t) {
					function __() {
						this.constructor = e;
					}
					for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
					e.prototype =
						null === t
							? Object.create(t)
							: ((__.prototype = t.prototype), new __());
				},
			r = (function(e) {
				function ApiAiBaseError(t) {
					var n = e.call(this, t) || this;
					return (n.message = t), (n.stack = new Error().stack), n;
				}
				return i(ApiAiBaseError, e), ApiAiBaseError;
			})(Error),
			o = (function(e) {
				function ApiAiClientConfigurationError(t) {
					var n = e.call(this, t) || this;
					return (n.name = "ApiAiClientConfigurationError"), n;
				}
				return (
					i(ApiAiClientConfigurationError, e),
					ApiAiClientConfigurationError
				);
			})(r);
		t.ApiAiClientConfigurationError = o;
		var s = (function(e) {
			function ApiAiRequestError(t, n) {
				void 0 === n && (n = null);
				var i = e.call(this, t) || this;
				return (
					(i.message = t),
					(i.code = n),
					(i.name = "ApiAiRequestError"),
					i
				);
			}
			return i(ApiAiRequestError, e), ApiAiRequestError;
		})(r);
		t.ApiAiRequestError = s;
	},
	function(e, t, n) {
		"use strict";
		var i = n(0),
			r = n(2),
			o = (function() {
				function Request(e, t) {
					(this.apiAiClient = e),
						(this.options = t),
						(this.uri =
							this.apiAiClient.getApiBaseUrl() +
							"query?v=" +
							this.apiAiClient.getApiVersion()),
						(this.requestMethod = r.default.Method.POST),
						(this.headers = {
							Authorization:
								"Bearer " + this.apiAiClient.getAccessToken()
						}),
						(this.options.lang = this.apiAiClient.getApiLang()),
						(this.options.sessionId = this.apiAiClient.getSessionId());
				}
				return (
					(Request.handleSuccess = function(e) {
						return Promise.resolve(JSON.parse(e.responseText));
					}),
					(Request.handleError = function(e) {
						var t = null;
						try {
							var n = JSON.parse(e.responseText);
							t =
								n.status && n.status.errorDetails
									? new i.ApiAiRequestError(
											n.status.errorDetails,
											n.status.code
										)
									: new i.ApiAiRequestError(
											e.statusText,
											e.status
										);
						} catch (n) {
							t = new i.ApiAiRequestError(e.statusText, e.status);
						}
						return Promise.reject(t);
					}),
					(Request.prototype.perform = function(e) {
						void 0 === e && (e = null);
						var t = e ? e : this.options;
						return r.default
							.ajax(this.requestMethod, this.uri, t, this.headers)
							.then(Request.handleSuccess.bind(this))
							.catch(Request.handleError.bind(this));
					}),
					Request
				);
			})();
		Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = o);
	},
	function(e, t, n) {
		"use strict";
		var i = (function() {
			function XhrRequest() {}
			return (
				(XhrRequest.ajax = function(e, t, n, i, r) {
					return (
						void 0 === n && (n = null),
						void 0 === i && (i = null),
						void 0 === r && (r = {}),
						new Promise(function(o, s) {
							var a = XhrRequest.createXMLHTTPObject(),
								u = t,
								c = null;
							if (n && e === XhrRequest.Method.GET) {
								u += "?";
								var h = 0;
								for (var l in n)
									n.hasOwnProperty(l) &&
										(h++ && (u += "&"),
										(u +=
											encodeURIComponent(l) +
											"=" +
											encodeURIComponent(n[l])));
							} else n && (i || (i = {}), (i["Content-Type"] = "application/json"), (c = JSON.stringify(n)));
							for (var l in r) l in a && (a[l] = r[l]);
							if ((a.open(XhrRequest.Method[e], u, !0), i))
								for (var l in i)
									i.hasOwnProperty(l) &&
										a.setRequestHeader(l, i[l]);
							c ? a.send(c) : a.send(),
								(a.onload = function() {
									a.status >= 200 && a.status < 300
										? o(a)
										: s(a);
								}),
								(a.onerror = function() {
									s(a);
								});
						})
					);
				}),
				(XhrRequest.get = function(e, t, n, i) {
					return (
						void 0 === t && (t = null),
						void 0 === n && (n = null),
						void 0 === i && (i = {}),
						XhrRequest.ajax(XhrRequest.Method.GET, e, t, n, i)
					);
				}),
				(XhrRequest.post = function(e, t, n, i) {
					return (
						void 0 === t && (t = null),
						void 0 === n && (n = null),
						void 0 === i && (i = {}),
						XhrRequest.ajax(XhrRequest.Method.POST, e, t, n, i)
					);
				}),
				(XhrRequest.put = function(e, t, n, i) {
					return (
						void 0 === t && (t = null),
						void 0 === n && (n = null),
						void 0 === i && (i = {}),
						XhrRequest.ajax(XhrRequest.Method.PUT, e, t, n, i)
					);
				}),
				(XhrRequest.delete = function(e, t, n, i) {
					return (
						void 0 === t && (t = null),
						void 0 === n && (n = null),
						void 0 === i && (i = {}),
						XhrRequest.ajax(XhrRequest.Method.DELETE, e, t, n, i)
					);
				}),
				(XhrRequest.createXMLHTTPObject = function() {
					for (
						var e = null, t = 0;
						t < XhrRequest.XMLHttpFactories.length;
						t++
					) {
						try {
							e = XhrRequest.XMLHttpFactories[t]();
						} catch (e) {
							continue;
						}
						break;
					}
					return e;
				}),
				XhrRequest
			);
		})();
		(i.XMLHttpFactories = [
			function() {
				return new XMLHttpRequest();
			},
			function() {
				return new ActiveXObject("Msxml2.XMLHTTP");
			},
			function() {
				return new ActiveXObject("Msxml3.XMLHTTP");
			},
			function() {
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		]),
			(function(e) {
				var t;
				!(function(e) {
					(e[(e.GET = "GET")] = "GET"),
						(e[(e.POST = "POST")] = "POST"),
						(e[(e.PUT = "PUT")] = "PUT"),
						(e[(e.DELETE = "DELETE")] = "DELETE");
				})((t = e.Method || (e.Method = {})));
			})(i || (i = {})),
			Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.default = i);
	},
	function(e, t, n) {
		"use strict";
		var i;
		!(function(e) {
			var t;
			!(function(e) {
				(e[(e.EN = "en")] = "EN"),
					(e[(e.DE = "de")] = "DE"),
					(e[(e.ES = "es")] = "ES"),
					(e[(e.PT_BR = "pt-BR")] = "PT_BR"),
					(e[(e.ZH_HK = "zh-HK")] = "ZH_HK"),
					(e[(e.ZH_CN = "zh-CN")] = "ZH_CN"),
					(e[(e.ZH_TW = "zh-TW")] = "ZH_TW"),
					(e[(e.NL = "nl")] = "NL"),
					(e[(e.FR = "fr")] = "FR"),
					(e[(e.IT = "it")] = "IT"),
					(e[(e.JA = "ja")] = "JA"),
					(e[(e.KO = "ko")] = "KO"),
					(e[(e.PT = "pt")] = "PT"),
					(e[(e.RU = "ru")] = "RU"),
					(e[(e.UK = "uk")] = "UK");
			})((t = e.AVAILABLE_LANGUAGES || (e.AVAILABLE_LANGUAGES = {}))),
				(e.VERSION = "2.0.0-beta.8"),
				(e.DEFAULT_BASE_URL = "https://api.api.ai/v1/"),
				(e.DEFAULT_API_VERSION = "20150910"),
				(e.DEFAULT_CLIENT_LANG = t.EN),
				(e.DEFAULT_TTS_HOST = "https://api.api.ai/api/tts");
		})(i || (i = {})),
			Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.default = i);
	},
	function(e, t, n) {
		"use strict";
		function _resamplerJs() {
			function Resampler(e, t, n, i, r) {
				(this.fromSampleRate = e),
					(this.toSampleRate = t),
					(this.channels = 0 | n),
					(this.outputBufferSize = i),
					(this.noReturn = !!r),
					this.initialize();
			}
			(Resampler.prototype.initialize = function() {
				if (
					this.fromSampleRate <= 0 ||
					this.toSampleRate <= 0 ||
					this.channels <= 0
				)
					throw new Error(
						"Invalid settings specified for the resampler."
					);
				this.fromSampleRate == this.toSampleRate
					? ((this.resampler = this.bypassResampler),
						(this.ratioWeight = 1))
					: ((this.resampler = function(e) {
							var t = Math.min(e.length, this.outputBufferSize);
							if (t % this.channels != 0)
								throw new Error(
									"Buffer was of incorrect sample length."
								);
							if (t <= 0) return this.noReturn ? 0 : [];
							for (
								var n = 0, i = new Array(this.channels), r = 0;
								r < this.channels;
								++r
							)
								i[r] = 0;
							var o = 0,
								s = 0,
								a = !this.tailExists;
							this.tailExists = !1;
							var u = this.outputBuffer,
								c = 0,
								h = 0,
								l = this.ratioWeight;
							do {
								if (a)
									for (n = l, r = 0; r < this.channels; ++r)
										i[r] = 0;
								else {
									for (
										n = this.lastWeight, r = 0;
										r < this.channels;
										++r
									)
										i[r] = this.lastOutput[r];
									a = !0;
								}
								for (; n > 0 && o < t; ) {
									if (((s = 1 + o - h), !(n >= s))) {
										for (r = 0; r < this.channels; ++r)
											i[r] += e[o + (r > 0 ? r : 0)] * n;
										(h += n), (n = 0);
										break;
									}
									for (r = 0; r < this.channels; ++r)
										i[r] += e[o++] * s;
									(h = o), (n -= s);
								}
								if (0 != n) {
									for (
										this.lastWeight = n, r = 0;
										r < this.channels;
										++r
									)
										this.lastOutput[r] = i[r];
									this.tailExists = !0;
									break;
								}
								for (r = 0; r < this.channels; ++r)
									u[c++] = i[r] / l;
							} while (o < t);
							return this.bufferSlice(c);
						}),
						(this.ratioWeight =
							this.fromSampleRate / this.toSampleRate),
						(this.tailExists = !1),
						(this.lastWeight = 0),
						this.initializeBuffers());
			}),
				(Resampler.prototype.bypassResampler = function(e) {
					return this.noReturn
						? ((this.outputBuffer = e), e.length)
						: e;
				}),
				(Resampler.prototype.bufferSlice = function(e) {
					if (this.noReturn) return e;
					try {
						return this.outputBuffer.subarray(0, e);
					} catch (t) {
						try {
							return (
								(this.outputBuffer.length = e),
								this.outputBuffer
							);
						} catch (t) {
							return this.outputBuffer.slice(0, e);
						}
					}
				}),
				(Resampler.prototype.initializeBuffers = function() {
					try {
						(this.outputBuffer = new Float32Array(
							this.outputBufferSize
						)),
							(this.lastOutput = new Float32Array(this.channels));
					} catch (e) {
						(this.outputBuffer = []), (this.lastOutput = []);
					}
				}),
				(navigator.Resampler = Resampler);
		}
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.default = _resamplerJs);
	},
	function(e, t, n) {
		"use strict";
		var i = n(6);
		t.ApiAiClient = i.ApiAiClient;
		var r = n(7);
		t.ApiAiStreamClient = r.ApiAiStreamClient;
	},
	function(e, t, n) {
		"use strict";
		var i = n(3),
			r = n(0),
			o = n(8),
			s = n(10),
			a = n(9),
			u = n(2);
		t.XhrRequest = u.default;
		var c = (function() {
			function ApiAiClient(e) {
				if (!e || !e.accessToken)
					throw new r.ApiAiClientConfigurationError(
						"Access token is required for new ApiAi.Client instance"
					);
				(this.accessToken = e.accessToken),
					(this.apiLang = e.lang || i.default.DEFAULT_CLIENT_LANG),
					(this.apiVersion =
						e.version || i.default.DEFAULT_API_VERSION),
					(this.apiBaseUrl = e.baseUrl || i.default.DEFAULT_BASE_URL),
					(this.sessionId = e.sessionId || this.guid()),
					(this.streamClientClass = e.streamClientClass || null);
			}
			return (
				(ApiAiClient.prototype.textRequest = function(e, t) {
					if ((void 0 === t && (t = {}), !e))
						throw new r.ApiAiClientConfigurationError(
							"Query should not be empty"
						);
					return (t.query = e), new s.default(this, t).perform();
				}),
				(ApiAiClient.prototype.eventRequest = function(e, t, n) {
					if (
						(void 0 === t && (t = {}), void 0 === n && (n = {}), !e)
					)
						throw new r.ApiAiClientConfigurationError(
							"Event name can not be empty"
						);
					return (
						(n.event = { name: e, data: t }),
						new o.EventRequest(this, n).perform()
					);
				}),
				(ApiAiClient.prototype.ttsRequest = function(e) {
					if (!e)
						throw new r.ApiAiClientConfigurationError(
							"Query should not be empty"
						);
					return new a.TTSRequest(this).makeTTSRequest(e);
				}),
				(ApiAiClient.prototype.createStreamClient = function(e) {
					if ((void 0 === e && (e = {}), this.streamClientClass))
						return (
							(e.token = this.getAccessToken()),
							(e.sessionId = this.getSessionId()),
							(e.lang = this.getApiLang()),
							new this.streamClientClass(e)
						);
					throw new r.ApiAiClientConfigurationError(
						"No StreamClient implementation given to ApiAi Client constructor"
					);
				}),
				(ApiAiClient.prototype.getAccessToken = function() {
					return this.accessToken;
				}),
				(ApiAiClient.prototype.getApiVersion = function() {
					return this.apiVersion
						? this.apiVersion
						: i.default.DEFAULT_API_VERSION;
				}),
				(ApiAiClient.prototype.getApiLang = function() {
					return this.apiLang
						? this.apiLang
						: i.default.DEFAULT_CLIENT_LANG;
				}),
				(ApiAiClient.prototype.getApiBaseUrl = function() {
					return this.apiBaseUrl
						? this.apiBaseUrl
						: i.default.DEFAULT_BASE_URL;
				}),
				(ApiAiClient.prototype.setSessionId = function(e) {
					this.sessionId = e;
				}),
				(ApiAiClient.prototype.getSessionId = function() {
					return this.sessionId;
				}),
				(ApiAiClient.prototype.guid = function() {
					var e = function() {
						return Math.floor(65536 * (1 + Math.random()))
							.toString(16)
							.substring(1);
					};
					return (
						e() +
						e() +
						"-" +
						e() +
						"-" +
						e() +
						"-" +
						e() +
						"-" +
						e() +
						e() +
						e()
					);
				}),
				ApiAiClient
			);
		})();
		t.ApiAiClient = c;
	},
	function(e, t, n) {
		"use strict";
		var i =
				(this && this.__extends) ||
				function(e, t) {
					function __() {
						this.constructor = e;
					}
					for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
					e.prototype =
						null === t
							? Object.create(t)
							: ((__.prototype = t.prototype), new __());
				},
			r = n(14),
			o = (function(e) {
				function ApiAiStreamClient(t) {
					void 0 === t && (t = {});
					var n = this;
					return (
						t.server ||
							(t.server =
								"" +
								ApiAiStreamClient.STREAM_CLIENT_SERVER_PROTO +
								"://" +
								ApiAiStreamClient.DEFAULT_STREAM_CLIENT_BASE_URL +
								ApiAiStreamClient.STREAM_CLIENT_SERVER_PATH),
						(n = e.call(this, t) || this)
					);
				}
				return i(ApiAiStreamClient, e), ApiAiStreamClient;
			})(r.default);
		(o.DEFAULT_STREAM_CLIENT_BASE_URL = "api-ws.api.ai:4435/v1/"),
			(o.STREAM_CLIENT_SERVER_PROTO = "wss"),
			(o.STREAM_CLIENT_SERVER_PATH = "/ws/query"),
			(t.ApiAiStreamClient = o);
	},
	function(e, t, n) {
		"use strict";
		var i =
				(this && this.__extends) ||
				function(e, t) {
					function __() {
						this.constructor = e;
					}
					for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
					e.prototype =
						null === t
							? Object.create(t)
							: ((__.prototype = t.prototype), new __());
				},
			r = n(1),
			o = (function(e) {
				function EventRequest() {
					return (null !== e && e.apply(this, arguments)) || this;
				}
				return i(EventRequest, e), EventRequest;
			})(r.default);
		t.EventRequest = o;
	},
	function(e, t, n) {
		"use strict";
		var i =
				(this && this.__extends) ||
				function(e, t) {
					function __() {
						this.constructor = e;
					}
					for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
					e.prototype =
						null === t
							? Object.create(t)
							: ((__.prototype = t.prototype), new __());
				},
			r = n(3),
			o = n(2),
			s = n(1),
			a = n(0),
			u = (function(e) {
				function TTSRequest(t, n) {
					void 0 === n && (n = {});
					var i = e.call(this, t, n) || this;
					(i.apiAiClient = t),
						(i.resolveTTSPromise = function(e) {
							return i.speak(e.response);
						}),
						(i.rejectTTSPromise = function(e) {
							throw new a.ApiAiRequestError(e);
						}),
						(i.uri = r.default.DEFAULT_TTS_HOST);
					var o = window.AudioContext || webkitAudioContext;
					return (
						TTSRequest.audioContext ||
							(TTSRequest.audioContext = new o()),
						i
					);
				}
				return (
					i(TTSRequest, e),
					(TTSRequest.prototype.makeTTSRequest = function(e) {
						if (!e)
							throw new a.ApiAiClientConfigurationError(
								"Request can not be empty"
							);
						var t = {
								lang: "en-US",
								text: encodeURIComponent(e),
								v: this.apiAiClient.getApiVersion()
							},
							n = {
								Authorization:
									"Bearer " +
									this.apiAiClient.getAccessToken(),
								"Accept-language": "en-US"
							};
						return this.makeRequest(this.uri, t, n, {
							responseType: TTSRequest.RESPONSE_TYPE_ARRAYBUFFER
						})
							.then(this.resolveTTSPromise)
							.catch(this.rejectTTSPromise.bind(this));
					}),
					(TTSRequest.prototype.makeRequest = function(e, t, n, i) {
						return o.default.get(e, t, n, i);
					}),
					(TTSRequest.prototype.speak = function(e) {
						var t = this;
						return e.byteLength
							? new Promise(function(n, i) {
									TTSRequest.audioContext
										.decodeAudioData(
											e,
											function(e) {
												return t.playSound(e, n);
											},
											i
										)
										.then(null, function(e) {
											return i(e);
										});
								})
							: Promise.reject("TTS Server unavailable");
					}),
					(TTSRequest.prototype.playSound = function(e, t) {
						var n = TTSRequest.audioContext.createBufferSource();
						(n.buffer = e),
							n.connect(TTSRequest.audioContext.destination),
							(n.onended = t),
							n.start(0);
					}),
					TTSRequest
				);
			})(s.default);
		(u.RESPONSE_TYPE_ARRAYBUFFER = "arraybuffer"), (t.TTSRequest = u);
	},
	function(e, t, n) {
		"use strict";
		var i =
				(this && this.__extends) ||
				function(e, t) {
					function __() {
						this.constructor = e;
					}
					for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
					e.prototype =
						null === t
							? Object.create(t)
							: ((__.prototype = t.prototype), new __());
				},
			r = n(1),
			o = (function(e) {
				function TextRequest() {
					return (null !== e && e.apply(this, arguments)) || this;
				}
				return i(TextRequest, e), TextRequest;
			})(r.default);
		Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = o);
	},
	function(e, t, n) {
		"use strict";
		var i = n(4),
			r = n(15),
			o = (function() {
				function Processors() {}
				return (
					(Processors.bindProcessors = function() {
						function MagicBuffer(e) {
							(this.chunkSize = e),
								(this.array_data = []),
								(this.callback = null);
						}
						i.default(),
							(window.AudioContext =
								window.AudioContext || webkitAudioContext),
							(AudioContext.prototype.createResampleProcessor = function(
								e,
								t,
								n,
								i
							) {
								var r = this.createScriptProcessor(e, t, n),
									o = new navigator.Resampler(
										this.sampleRate,
										i,
										t,
										e,
										!0
									);
								return (
									(r.onaudioprocess = function(e) {
										for (
											var t = e.inputBuffer.getChannelData(
													0
												),
												n = e.outputBuffer.getChannelData(
													0
												),
												i = o.resampler(t),
												r = 0;
											r < i;
											++r
										)
											n[r] = o.outputBuffer[r];
									}),
									r
								);
							}),
							(MagicBuffer.prototype.push = function(e) {
								for (
									var t = e.length,
										n = new Array(Math.ceil(t / 2)),
										i = 0;
									i < t;
									i += 2
								)
									n[i / 2] = e[i];
								Array.prototype.push.apply(this.array_data, n),
									this.process();
							}),
							(MagicBuffer.prototype.process = function() {
								for (
									var e;
									this.array_data.length > this.chunkSize;

								)
									(e = this.array_data.splice(
										0,
										this.chunkSize
									)),
										this.callback && this.callback(e);
							}),
							(MagicBuffer.prototype.drop = function() {
								this.array_data.splice(
									0,
									this.array_data.length
								);
							}),
							(AudioContext.prototype.createEndOfSpeechProcessor = function(
								e
							) {
								var t = this.createScriptProcessor(e, 1, 1);
								t.endOfSpeechCallback = null;
								var n = new r.default();
								t.vad = n;
								var i = new MagicBuffer(160);
								return (
									(i.callback = function(e) {
										var r = n.process(e);
										"CONTINUE" !== r &&
											t.endOfSpeechCallback &&
											(t.endOfSpeechCallback(), i.drop());
									}),
									(t.onaudioprocess = function(e) {
										var t = e.inputBuffer.getChannelData(0),
											n = e.outputBuffer.getChannelData(
												0
											);
										i.push(t);
										for (var r = 0; r < t.length; r++)
											n[r] = t[r];
									}),
									t
								);
							});
					}),
					Processors
				);
			})();
		t.Processors = o;
	},
	function(e, t, n) {
		"use strict";
		var i = n(4),
			r = n(13),
			o = (function() {
				function Recorder(e, t) {
					void 0 === t && (t = {});
					var n = t.bufferLen || 4096;
					(this.context = e.context),
						(this.node = this.context.createScriptProcessor(
							n,
							1,
							1
						));
					var r = new Worker(this._getRecorderWorkerUrl());
					r.postMessage({
						command: "init",
						config: {
							sampleRate: this.context.sampleRate,
							resamplerInitializerBody: this._getFunctionBody(
								i.default
							)
						}
					});
					var o,
						s = !1;
					(this.node.onaudioprocess = function(e) {
						s &&
							r.postMessage({
								command: "record",
								buffer: [e.inputBuffer.getChannelData(0)]
							});
					}),
						(this.configure = function(e) {
							for (var n in e)
								e.hasOwnProperty(n) && (t[n] = e[n]);
						}),
						(this.record = function() {
							s = !0;
						}),
						(this.stop = function() {
							s = !1;
						}),
						(this.clear = function() {
							r.postMessage({ command: "clear" });
						}),
						(this.getBuffer = function(e) {
							(o = e || t.callback),
								r.postMessage({ command: "getBuffer" });
						}),
						(this.export16kMono = function(e, n) {
							if (
								((o = e || t.callback),
								(n = n || t.type || "audio/raw"),
								!o)
							)
								throw new Error("Callback not set");
							r.postMessage({
								command: "export16kMono",
								type: n
							});
						}),
						(r.onmessage = function(e) {
							o(e.data);
						}),
						e.connect(this.node),
						this.node.connect(this.context.destination);
				}
				return (
					(Recorder.prototype._getRecorderWorkerUrl = function() {
						var e = window.URL && URL.createObjectURL.bind(URL);
						return e(
							new Blob(
								[
									this._getFunctionBody(
										r.default.createRecorderWorker()
									)
								],
								{ type: "text/javascript" }
							)
						);
					}),
					(Recorder.prototype._getFunctionBody = function(e) {
						if ("function" != typeof e)
							throw new Error(
								"Illegal argument exception: argument is not a funtion: " +
									e
							);
						var t = e.toString(),
							n = t.indexOf("{"),
							i = t.lastIndexOf("}");
						return n > 0 && i > 0 ? t.substring(n + 1, i) : t;
					}),
					Recorder
				);
			})();
		Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = o);
	},
	function(e, t, n) {
		"use strict";
		var i = (function() {
			function RecorderWorker() {}
			return (
				(RecorderWorker.createRecorderWorker = function() {
					return function _recorderWorkerJs() {
						function init(n) {
							new Function(n.resamplerInitializerBody)(),
								(e = n.sampleRate),
								(t = new navigator.Resampler(
									e,
									16e3,
									1,
									51200,
									!1
								));
						}
						function record(e) {
							i.push(e[0]), (n += e[0].length);
						}
						function export16kMono(e) {
							var r = mergeBuffers(i, n),
								o = t.resampler(r),
								s = encodeRAW(o),
								a = new Blob([s], { type: e });
							this.postMessage(a);
						}
						function getBuffer() {
							var e = [];
							e.push(mergeBuffers(i, n)), this.postMessage(e);
						}
						function clear() {
							(n = 0), (i = []);
						}
						function mergeBuffers(e, t) {
							for (
								var n = new Float32Array(t), i = 0, r = 0;
								r < e.length;
								r++
							)
								n.set(e[r], i), (i += e[r].length);
							return n;
						}
						function _floatTo16BitPCM(e, t, n) {
							for (var i = 0; i < n.length; i++, t += 2) {
								var r = Math.max(-1, Math.min(1, n[i]));
								e.setInt16(
									t,
									r < 0 ? 32768 * r : 32767 * r,
									!0
								);
							}
						}
						function encodeRAW(e) {
							var t = new ArrayBuffer(2 * e.length),
								n = new DataView(t);
							return _floatTo16BitPCM(n, 0, e), n;
						}
						var e,
							t,
							n = 0,
							i = [];
						this.onmessage = function(e) {
							switch (e.data.command) {
								case "init":
									init(e.data.config);
									break;
								case "record":
									record(e.data.buffer);
									break;
								case "export16kMono":
									export16kMono(e.data.type);
									break;
								case "getBuffer":
									getBuffer();
									break;
								case "clear":
									clear();
							}
						};
					};
				}),
				RecorderWorker
			);
		})();
		Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = i);
	},
	function(e, t, n) {
		"use strict";
		var i = n(12),
			r = n(11),
			o = (function() {
				function StreamClient(e) {
					function _noop() {}
					void 0 === e && (e = {}),
						r.Processors.bindProcessors(),
						(this.server = e.server || ""),
						(this.token = e.token || ""),
						(this.sessionId = e.sessionId || ""),
						(this.lang = e.lang || "en"),
						(this.contentType =
							e.contentType || StreamClient.CONTENT_TYPE),
						(this.readingInterval =
							e.readingInterval || StreamClient.INTERVAL),
						(this.onOpen =
							(e.onOpen && e.onOpen.bind(this)) || _noop),
						(this.onClose =
							(e.onClose && e.onClose.bind(this)) || _noop),
						(this.onInit =
							(e.onInit && e.onInit.bind(this)) || _noop),
						(this.onStartListening =
							(e.onStartListening &&
								e.onStartListening.bind(this)) ||
							_noop),
						(this.onStopListening =
							(e.onStopListening &&
								e.onStopListening.bind(this)) ||
							_noop),
						(this.onResults =
							(e.onResults && e.onResults.bind(this)) || _noop),
						(this.onEvent =
							(e.onEvent && e.onEvent.bind(this)) || _noop),
						(this.onError =
							(e.onError && e.onError.bind(this)) || _noop);
				}
				return (
					(StreamClient.prototype.init = function() {
						var e = this;
						this.onEvent(
							StreamClient.Events.MSG_WAITING_MICROPHONE,
							"Waiting for approval to access your microphone ..."
						);
						try {
							(window.AudioContext =
								window.AudioContext || webkitAudioContext),
								(navigator.getUserMedia =
									navigator.getUserMedia ||
									navigator.webkitGetUserMedia ||
									navigator.mozGetUserMedia),
								(window.URL = window.URL || window.webkitURL),
								(this.audioContext = new AudioContext());
						} catch (e) {
							this.onError(
								StreamClient.ERROR.ERR_CLIENT,
								"Error initializing Web Audio browser: " +
									JSON.stringify(e)
							);
						}
						navigator.getUserMedia
							? navigator.getUserMedia(
									{ audio: !0 },
									this.startUserMedia.bind(this, this.onInit),
									function(t) {
										e.onError(
											StreamClient.ERROR.ERR_CLIENT,
											"No live audio input in this browser: " +
												JSON.stringify(t)
										);
									}
								)
							: this.onError(
									StreamClient.ERROR.ERR_CLIENT,
									"No user media support"
								);
					}),
					(StreamClient.prototype.startUserMedia = function(e, t) {
						(this.mediaStreamSource = this.audioContext.createMediaStreamSource(
							t
						)),
							(this.userSpeechAnalyser = this.audioContext.createAnalyser()),
							this.mediaStreamSource.connect(
								this.userSpeechAnalyser
							),
							(this.recorder = new i.default(
								this.mediaStreamSource
							)),
							this.onEvent(
								StreamClient.Events.MSG_INIT_RECORDER,
								"Recorder initialized"
							),
							e && e();
					}),
					(StreamClient.prototype.isInitialise = function() {
						return !!this.recorder;
					}),
					(StreamClient.prototype.sendJson = function(e) {
						this.socketSend(JSON.stringify(e)),
							this.socketSend(StreamClient.TAG_END_OF_SENTENCE);
					}),
					(StreamClient.prototype.startListening = function() {
						var e = this;
						if (!this.recorder)
							return void this.onError(
								StreamClient.ERROR.ERR_AUDIO,
								"Recorder undefined"
							);
						if (!this.ws)
							return void this.onError(
								StreamClient.ERROR.ERR_AUDIO,
								"No web socket connection"
							);
						var t = function(t) {
							(e.resampleProcessor = e.audioContext.createResampleProcessor(
								256,
								1,
								1,
								16e3
							)),
								e.mediaStreamSource.connect(
									e.resampleProcessor
								);
							var n = e.audioContext.createEndOfSpeechProcessor(
								256
							);
							(n.endOfSpeechCallback = t),
								e.resampleProcessor.connect(n);
						};
						t(function() {
							return e.stopListening();
						}),
							this.ws.send(
								"{'timezone':'America/New_York', 'lang':'" +
									this.lang +
									"', 'sessionId':'" +
									this.sessionId +
									"'}"
							),
							(this.intervalKey = setInterval(function() {
								e.recorder.export16kMono(function(t) {
									e.socketSend(t), e.recorder.clear();
								}, "audio/x-raw");
							}, this.readingInterval)),
							this.recorder.record(),
							this.onStartListening();
					}),
					(StreamClient.prototype.stopListening = function() {
						var e = this;
						this.resampleProcessor &&
							this.resampleProcessor.disconnect(),
							clearInterval(this.intervalKey);
						var t = this.recorder;
						return t
							? (t.stop(),
								this.onEvent(
									StreamClient.Events.MSG_STOP,
									"Stopped recording"
								),
								t.export16kMono(function(n) {
									e.socketSend(n),
										e.socketSend(
											StreamClient.TAG_END_OF_SENTENCE
										),
										t.clear();
								}, "audio/x-raw"),
								void this.onStopListening())
							: void this.onError(
									StreamClient.ERROR.ERR_AUDIO,
									"Recorder undefined"
								);
					}),
					(StreamClient.prototype.isOpen = function() {
						return !!this.ws;
					}),
					(StreamClient.prototype.openWebSocket = function() {
						if (!this.recorder)
							return void this.onError(
								StreamClient.ERROR.ERR_AUDIO,
								"Recorder undefined"
							);
						this.ws && this.close();
						try {
							this.ws = this.createWebSocket();
						} catch (e) {
							this.onError(
								StreamClient.ERROR.ERR_CLIENT,
								"No web socket support in this browser!"
							);
						}
					}),
					(StreamClient.prototype.createWebSocket = function() {
						var e = this,
							t =
								this.server +
								"?" +
								this.contentType +
								"&access_token=" +
								this.token,
							n = new WebSocket(t);
						return (
							(n.onmessage = function(t) {
								var n = t.data;
								e.onEvent(
									StreamClient.Events.MSG_WEB_SOCKET,
									n
								),
									n instanceof Object && !(n instanceof Blob)
										? e.onError(
												StreamClient.ERROR.ERR_SERVER,
												"WebSocket: onEvent: got Object that is not a Blob"
											)
										: n instanceof Blob
											? e.onError(
													StreamClient.ERROR
														.ERR_SERVER,
													"WebSocket: got Blob"
												)
											: e.onResults(JSON.parse(n));
							}),
							(n.onopen = function(t) {
								e.onOpen(),
									e.onEvent(
										StreamClient.Events.MSG_WEB_SOCKET_OPEN,
										t
									);
							}),
							(n.onclose = function(t) {
								e.onClose(),
									e.onEvent(
										StreamClient.Events
											.MSG_WEB_SOCKET_CLOSE,
										t.code +
											"/" +
											t.reason +
											"/" +
											t.wasClean
									);
							}),
							(n.onerror = function(t) {
								e.onError(
									StreamClient.ERROR.ERR_NETWORK,
									JSON.stringify(t.data)
								);
							}),
							n
						);
					}),
					(StreamClient.prototype.open = function() {
						this.recorder ? this.openWebSocket() : this.init();
					}),
					(StreamClient.prototype.close = function() {
						clearInterval(this.intervalKey),
							this.recorder &&
								(this.recorder.stop(),
								this.recorder.clear(),
								this.onEvent(
									StreamClient.Events.MSG_STOP,
									"Stopped recording"
								)),
							this.ws && (this.ws.close(), (this.ws = null));
					}),
					(StreamClient.prototype.socketSend = function(e) {
						if (!this.ws)
							return void this.onError(
								StreamClient.ERROR.ERR_CLIENT,
								"No web socket connection: failed to send: " + e
							);
						var t = this.ws.readyState;
						if (1 != t) {
							var n = "WebSocket: ";
							switch (t) {
								case 0:
									n += "The connection is not yet open.";
									break;
								case 2:
									n +=
										"The connection is in the process of closing.";
									break;
								case 3:
									n +=
										"The connection is closed or couldn't be opened.";
							}
							(n +=
								" readyState=" +
								t +
								" (!=1) failed to send: " +
								e),
								this.onError(StreamClient.ERROR.ERR_NETWORK, n);
						}
						e instanceof Blob
							? e.size > 0
								? (this.ws.send(e),
									this.onEvent(
										StreamClient.Events.MSG_SEND,
										"Send: blob: " + e.type + ", " + e.size
									))
								: this.onEvent(
										StreamClient.Events.MSG_SEND_EMPTY,
										"Send: blob: " + e.type + ", EMPTY"
									)
							: (this.ws.send(e),
								this.onEvent(
									StreamClient.Events.MSG_SEND_EOS_OR_JSON,
									"Send string: " + e
								));
					}),
					StreamClient
				);
			})();
		(o.CONTENT_TYPE =
			"content-type=audio/x-raw,+layout=(string)interleaved,+rate=(int)16000,+format=(string)S16LE,+channels=(int)1"),
			(o.INTERVAL = 250),
			(o.TAG_END_OF_SENTENCE = "EOS"),
			(function(e) {
				var t;
				!(function(e) {
					(e[(e.ERR_NETWORK = 0)] = "ERR_NETWORK"),
						(e[(e.ERR_AUDIO = 1)] = "ERR_AUDIO"),
						(e[(e.ERR_SERVER = 2)] = "ERR_SERVER"),
						(e[(e.ERR_CLIENT = 3)] = "ERR_CLIENT");
				})((t = e.ERROR || (e.ERROR = {})));
				var n;
				!(function(e) {
					(e[(e.MSG_WAITING_MICROPHONE = 0)] =
						"MSG_WAITING_MICROPHONE"),
						(e[(e.MSG_MEDIA_STREAM_CREATED = 1)] =
							"MSG_MEDIA_STREAM_CREATED"),
						(e[(e.MSG_INIT_RECORDER = 2)] = "MSG_INIT_RECORDER"),
						(e[(e.MSG_RECORDING = 3)] = "MSG_RECORDING"),
						(e[(e.MSG_SEND = 4)] = "MSG_SEND"),
						(e[(e.MSG_SEND_EMPTY = 5)] = "MSG_SEND_EMPTY"),
						(e[(e.MSG_SEND_EOS_OR_JSON = 6)] =
							"MSG_SEND_EOS_OR_JSON"),
						(e[(e.MSG_WEB_SOCKET = 7)] = "MSG_WEB_SOCKET"),
						(e[(e.MSG_WEB_SOCKET_OPEN = 8)] =
							"MSG_WEB_SOCKET_OPEN"),
						(e[(e.MSG_WEB_SOCKET_CLOSE = 9)] =
							"MSG_WEB_SOCKET_CLOSE"),
						(e[(e.MSG_STOP = 10)] = "MSG_STOP"),
						(e[(e.MSG_CONFIG_CHANGED = 11)] = "MSG_CONFIG_CHANGED");
				})((n = e.Events || (e.Events = {})));
			})(o || (o = {})),
			Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.default = o);
	},
	function(e, t, n) {
		"use strict";
		var i = (function() {
			function VAD() {
				this.reset();
			}
			return (
				(VAD.prototype.process = function(e) {
					var t = this.frameActive(e);
					if (((this.time = 160 * this.frameNumber / 16e3), t))
						this.lastActiveTime >= 0 &&
						this.time - this.lastActiveTime <
							this.silenceLengthMilis
							? (this.sequenceCounter++,
								this.sequenceCounter >= this.minSequenceCount &&
									((this.lastSequenceTime = this.time),
									(this.silenceLengthMilis = Math.max(
										this.minSilenceLengthMilis,
										this.silenceLengthMilis -
											(this.maxSilenceLengthMilis -
												this.minSilenceLengthMilis) /
												4
									))))
							: (this.sequenceCounter = 1),
							(this.lastSequenceTime = this.time);
					else if (
						this.time - this.lastSequenceTime >
						this.silenceLengthMilis
					)
						return this.lastSequenceTime > 0
							? "TERMINATE"
							: "NO_SPEECH";
					return "CONTINUE";
				}),
				(VAD.prototype.frameActive = function(e) {
					for (
						var t = 0, n = 0, i = 0, r = e.length, o = 0;
						o < r;
						o++
					) {
						t += e[o] * e[o] / 160;
						var s = 0;
						(s = e[o] > 0 ? 1 : -1),
							0 != i && s != i && n++,
							(i = s);
					}
					this.frameNumber += 1;
					var a = !1;
					return (
						this.frameNumber < this.noiseFrames
							? ((this.noiseEnergy += t / this.noiseFrames),
								console.log("noiseEnergy=", this.noiseEnergy))
							: n >= this.minCZ &&
								n <= this.maxCZ &&
								t >
									Math.max(0.01, this.noiseEnergy) *
										this.energyFactor &&
								(a = !0),
						a
					);
				}),
				(VAD.prototype.reset = function() {
					(this.minCZ = 5),
						(this.maxCZ = 15),
						(this.frameLengthMilis = 10),
						(this.maxSilenceLengthMilis = 3.5),
						(this.minSilenceLengthMilis = 0.8),
						(this.silenceLengthMilis = this.maxSilenceLengthMilis),
						(this.sequenceLengthMilis = 0.03),
						(this.minSequenceCount = 3),
						(this.energyFactor = 3.1),
						(this.noiseFrames = Math.round(
							150 / this.frameLengthMilis
						)),
						(this.noiseEnergy = 0),
						(this.frameNumber = 0),
						(this.lastActiveTime = -1),
						(this.lastSequenceTime = 0),
						(this.sequenceCounter = 0),
						(this.time = 0);
				}),
				VAD
			);
		})();
		Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = i);
	},
	function(e, t, n) {
		e.exports = n(5);
	}
]);
