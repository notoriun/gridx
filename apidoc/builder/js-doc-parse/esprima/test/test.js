/*
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2011 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2011 Arpad Borsos <arpad.borsos@googlemail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint browser:true node:true */
/*global esprima:true */

var runTests, data;

data = {

    'Primary Expression': {

        'this\n': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ThisExpression',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 0 }
                }
            }],
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 0 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'this',
                range: [0, 3]
            }]
        },

        'null\n': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: null,
                    raw: 'null',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 0 }
                }
            }],
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 0 }
            },
            tokens: [{
                type: 'Null',
                value: 'null',
                range: [0, 3]
            }]
        },

        '\n    42\n\n': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 6],
                    loc: {
                        start: { line: 2, column: 4 },
                        end: { line: 2, column: 6 }
                    }
                },
                range: [5, 8],
                loc: {
                    start: { line: 2, column: 4 },
                    end: { line: 4, column: 0 }
                }
            }],
            range: [5, 8],
            loc: {
                start: { line: 2, column: 4 },
                end: { line: 4, column: 0 }
            },
            tokens: [{
                type: 'Numeric',
                value: '42',
                range: [5, 6]
            }]
        },

        '(1 + 2 ) * 3': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [1, 1],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 2 }
                        }
                    },
                    right: {
                        type: 'Literal',
                        value: 2,
                        raw: '2',
                        range: [5, 5],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 7],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 3,
                    raw: '3',
                    range: [11, 11],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        }

    },

    'Array Initializer': {

        'x = []': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            }],
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            },
            tokens: [{
                type: 'Identifier',
                value: 'x',
                range: [0, 0]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [2, 2]
            }, {
                type: 'Punctuator',
                value: '[',
                range: [4, 4]
            }, {
                type: 'Punctuator',
                value: ']',
                range: [5, 5]
            }]
        },

        'x = [ ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [4, 6],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x = [ 42 ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        },

        'x = [ 42, ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [4, 10],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x = [ ,, 42 ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [
                        null,
                        null,
                        {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [9, 10],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 11 }
                            }
                        }],
                    range: [4, 12],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'x = [ 1, 2, 3, ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [6, 6],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    }, {
                        type: 'Literal',
                        value: 2,
                        raw: '2',
                        range: [9, 9],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    }, {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [12, 12],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    }],
                    range: [4, 15],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 16 }
                    }
                },
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        'x = [ 1, 2,, 3, ]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [6, 6],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    }, {
                        type: 'Literal',
                        value: 2,
                        raw: '2',
                        range: [9, 9],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    }, null, {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [13, 13],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    range: [4, 16],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        '日本語 = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: '日本語',
                    range: [0, 2],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'T\u203F = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'T\u203F',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'T\u200C = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'T\u200C',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'T\u200D = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'T\u200D',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '\u2163\u2161 = []': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: '\u2163\u2161',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '\u2163\u2161\u200A=\u2009[]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: '\u2163\u2161',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        }

    },

    'Object Initializer': {

        'x = {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x = { }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [4, 6],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x = { answer: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'answer',
                            range: [6, 11],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [14, 15],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        kind: 'init',
                        range: [6, 15],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 16 }
                        }
                    }],
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'x = { if: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'if',
                            range: [6, 7],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [10, 11],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        kind: 'init',
                        range: [6, 11],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 12 }
                        }
                    }],
                    range: [4, 13],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'x = { true: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'true',
                            range: [6, 9],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [12, 13],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        kind: 'init',
                        range: [6, 13],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    range: [4, 15],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 16 }
                    }
                },
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        'x = { false: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'false',
                            range: [6, 10],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 11 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [13, 14],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        kind: 'init',
                        range: [6, 14],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 15 }
                        }
                    }],
                    range: [4, 16],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'x = { null: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'null',
                            range: [6, 9],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [12, 13],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        kind: 'init',
                        range: [6, 13],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    range: [4, 15],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 16 }
                    }
                },
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        'x = { "answer": 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'answer',
                            raw: '"answer"',
                            range: [6, 13],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [16, 17],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 18 }
                            }
                        },
                        kind: 'init',
                        range: [6, 17],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 18 }
                        }
                    }],
                    range: [4, 19],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 20 }
                    }
                },
                range: [0, 19],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'x = { x: 1, x: 2 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'x',
                                range: [6, 6],
                                loc: {
                                    start: { line: 1, column: 6 },
                                    end: { line: 1, column: 7 }
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: 1,
                                raw: '1',
                                range: [9, 9],
                                loc: {
                                    start: { line: 1, column: 9 },
                                    end: { line: 1, column: 10 }
                                }
                            },
                            kind: 'init',
                            range: [6, 9],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'x',
                                range: [12, 12],
                                loc: {
                                    start: { line: 1, column: 12 },
                                    end: { line: 1, column: 13 }
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: 2,
                                raw: '2',
                                range: [15, 15],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 16 }
                                }
                            },
                            kind: 'init',
                            range: [12, 15],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 16 }
                            }
                        }
                    ],
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'x = { get width() { return m_width } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'width',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'm_width',
                                        range: [27, 33],
                                        loc: {
                                            start: { line: 1, column: 27 },
                                            end: { line: 1, column: 34 }
                                        }
                                    },
                                    range: [20, 34],
                                    loc: {
                                        start: { line: 1, column: 20 },
                                        end: { line: 1, column: 35 }
                                    }
                                }],
                                range: [18, 35],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 36 }
                                }
                            },
                            range: [18, 35],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        kind: 'get',
                        range: [6, 35],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 36 }
                        }
                    }],
                    range: [4, 37],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 38 }
                    }
                },
                range: [0, 37],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 38 }
                }
            },
            range: [0, 37],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        'x = { get undef() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'undef',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [18, 19],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 20 }
                                }
                            },
                            range: [18, 19],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        kind: 'get',
                        range: [6, 19],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 20 }
                        }
                    }],
                    range: [4, 21],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 22 }
                    }
                },
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'x = { get if() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'if',
                            range: [10, 11],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [15, 16],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 17 }
                                }
                            },
                            range: [15, 16],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        kind: 'get',
                        range: [6, 16],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    range: [4, 18],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 19 }
                    }
                },
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'x = { get true() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'true',
                            range: [10, 13],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [17, 18],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            range: [17, 18],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        kind: 'get',
                        range: [6, 18],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 19 }
                        }
                    }],
                    range: [4, 20],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'x = { get false() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'false',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [18, 19],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 20 }
                                }
                            },
                            range: [18, 19],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        kind: 'get',
                        range: [6, 19],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 20 }
                        }
                    }],
                    range: [4, 21],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 22 }
                    }
                },
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'x = { get null() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'null',
                            range: [10, 13],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [17, 18],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            range: [17, 18],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        kind: 'get',
                        range: [6, 18],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 19 }
                        }
                    }],
                    range: [4, 20],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'x = { get "undef"() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'undef',
                            raw: '"undef"',
                            range: [10, 16],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [20, 21],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 22 }
                                }
                            },
                            range: [20, 21],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 22 }
                            }
                        },
                        kind: 'get',
                        range: [6, 21],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 22 }
                        }
                    }],
                    range: [4, 23],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 24 }
                    }
                },
                range: [0, 23],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'x = { get 10() {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 10,
                            raw: '10',
                            range: [10, 11],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [15, 16],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 17 }
                                }
                            },
                            range: [15, 16],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        kind: 'get',
                        range: [6, 16],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    range: [4, 18],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 19 }
                    }
                },
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'x = { set width(w) { m_width = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'width',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [16, 16],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 17 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_width',
                                            range: [21, 27],
                                            loc: {
                                                start: { line: 1, column: 21 },
                                                end: { line: 1, column: 28 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [31, 31],
                                            loc: {
                                                start: { line: 1, column: 31 },
                                                end: { line: 1, column: 32 }
                                            }
                                        },
                                        range: [21, 31],
                                        loc: {
                                            start: { line: 1, column: 21 },
                                            end: { line: 1, column: 32 }
                                        }
                                    },
                                    range: [21, 32],
                                    loc: {
                                        start: { line: 1, column: 21 },
                                        end: { line: 1, column: 33 }
                                    }
                                }],
                                range: [19, 33],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [19, 33],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 34 }
                            }
                        },
                        kind: 'set',
                        range: [6, 33],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [4, 35],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 36 }
                    }
                },
                range: [0, 35],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'x = { set if(w) { m_if = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'if',
                            range: [10, 11],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [13, 13],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_if',
                                            range: [18, 21],
                                            loc: {
                                                start: { line: 1, column: 18 },
                                                end: { line: 1, column: 22 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [25, 25],
                                            loc: {
                                                start: { line: 1, column: 25 },
                                                end: { line: 1, column: 26 }
                                            }
                                        },
                                        range: [18, 25],
                                        loc: {
                                            start: { line: 1, column: 18 },
                                            end: { line: 1, column: 26 }
                                        }
                                    },
                                    range: [18, 26],
                                    loc: {
                                        start: { line: 1, column: 18 },
                                        end: { line: 1, column: 27 }
                                    }
                                }],
                                range: [16, 27],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 28 }
                                }
                            },
                            range: [16, 27],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 28 }
                            }
                        },
                        kind: 'set',
                        range: [6, 27],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 28 }
                        }
                    }],
                    range: [4, 29],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [0, 29],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'x = { set true(w) { m_true = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'true',
                            range: [10, 13],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [15, 15],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 16 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_true',
                                            range: [20, 25],
                                            loc: {
                                                start: { line: 1, column: 20 },
                                                end: { line: 1, column: 26 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [29, 29],
                                            loc: {
                                                start: { line: 1, column: 29 },
                                                end: { line: 1, column: 30 }
                                            }
                                        },
                                        range: [20, 29],
                                        loc: {
                                            start: { line: 1, column: 20 },
                                            end: { line: 1, column: 30 }
                                        }
                                    },
                                    range: [20, 30],
                                    loc: {
                                        start: { line: 1, column: 20 },
                                        end: { line: 1, column: 31 }
                                    }
                                }],
                                range: [18, 31],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 32 }
                                }
                            },
                            range: [18, 31],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 32 }
                            }
                        },
                        kind: 'set',
                        range: [6, 31],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 32 }
                        }
                    }],
                    range: [4, 33],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 34 }
                    }
                },
                range: [0, 33],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 34 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'x = { set false(w) { m_false = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'false',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [16, 16],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 17 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_false',
                                            range: [21, 27],
                                            loc: {
                                                start: { line: 1, column: 21 },
                                                end: { line: 1, column: 28 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [31, 31],
                                            loc: {
                                                start: { line: 1, column: 31 },
                                                end: { line: 1, column: 32 }
                                            }
                                        },
                                        range: [21, 31],
                                        loc: {
                                            start: { line: 1, column: 21 },
                                            end: { line: 1, column: 32 }
                                        }
                                    },
                                    range: [21, 32],
                                    loc: {
                                        start: { line: 1, column: 21 },
                                        end: { line: 1, column: 33 }
                                    }
                                }],
                                range: [19, 33],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [19, 33],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 34 }
                            }
                        },
                        kind: 'set',
                        range: [6, 33],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [4, 35],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 36 }
                    }
                },
                range: [0, 35],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'x = { set null(w) { m_null = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'null',
                            range: [10, 13],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [15, 15],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 16 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_null',
                                            range: [20, 25],
                                            loc: {
                                                start: { line: 1, column: 20 },
                                                end: { line: 1, column: 26 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [29, 29],
                                            loc: {
                                                start: { line: 1, column: 29 },
                                                end: { line: 1, column: 30 }
                                            }
                                        },
                                        range: [20, 29],
                                        loc: {
                                            start: { line: 1, column: 20 },
                                            end: { line: 1, column: 30 }
                                        }
                                    },
                                    range: [20, 30],
                                    loc: {
                                        start: { line: 1, column: 20 },
                                        end: { line: 1, column: 31 }
                                    }
                                }],
                                range: [18, 31],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 32 }
                                }
                            },
                            range: [18, 31],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 32 }
                            }
                        },
                        kind: 'set',
                        range: [6, 31],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 32 }
                        }
                    }],
                    range: [4, 33],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 34 }
                    }
                },
                range: [0, 33],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 34 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'x = { set "null"(w) { m_null = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'null',
                            raw: '"null"',
                            range: [10, 15],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [17, 17],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 18 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_null',
                                            range: [22, 27],
                                            loc: {
                                                start: { line: 1, column: 22 },
                                                end: { line: 1, column: 28 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [31, 31],
                                            loc: {
                                                start: { line: 1, column: 31 },
                                                end: { line: 1, column: 32 }
                                            }
                                        },
                                        range: [22, 31],
                                        loc: {
                                            start: { line: 1, column: 22 },
                                            end: { line: 1, column: 32 }
                                        }
                                    },
                                    range: [22, 32],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 33 }
                                    }
                                }],
                                range: [20, 33],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [20, 33],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 34 }
                            }
                        },
                        kind: 'set',
                        range: [6, 33],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [4, 35],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 36 }
                    }
                },
                range: [0, 35],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'x = { set 10(w) { m_null = w } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 10,
                            raw: '10',
                            range: [10, 11],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w',
                                range: [13, 13],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_null',
                                            range: [18, 23],
                                            loc: {
                                                start: { line: 1, column: 18 },
                                                end: { line: 1, column: 24 }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [27, 27],
                                            loc: {
                                                start: { line: 1, column: 27 },
                                                end: { line: 1, column: 28 }
                                            }
                                        },
                                        range: [18, 27],
                                        loc: {
                                            start: { line: 1, column: 18 },
                                            end: { line: 1, column: 28 }
                                        }
                                    },
                                    range: [18, 28],
                                    loc: {
                                        start: { line: 1, column: 18 },
                                        end: { line: 1, column: 29 }
                                    }
                                }],
                                range: [16, 29],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 30 }
                                }
                            },
                            range: [16, 29],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 30 }
                            }
                        },
                        kind: 'set',
                        range: [6, 29],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 30 }
                        }
                    }],
                    range: [4, 31],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 32 }
                    }
                },
                range: [0, 31],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 32 }
                }
            },
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 32 }
            }
        },

        'x = { get: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'get',
                            range: [6, 8],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [11, 12],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 13 }
                            }
                        },
                        kind: 'init',
                        range: [6, 12],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 13 }
                        }
                    }],
                    range: [4, 14],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 15 }
                    }
                },
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        'x = { set: 43 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'set',
                            range: [6, 8],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 43,
                            raw: '43',
                            range: [11, 12],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 13 }
                            }
                        },
                        kind: 'init',
                        range: [6, 12],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 13 }
                        }
                    }],
                    range: [4, 14],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 15 }
                    }
                },
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        }

    },

    'Comments': {

        '/* block comment */ 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                raw: '42',
                range: [20, 21],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [20, 21],
            loc: {
                start: { line: 1, column: 20 },
                end: { line: 1, column: 22 }
            }
        },

        '42 /*The*/ /*Answer*/': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            }],
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            },
            comments: [{
                range: [3, 9],
                type: 'Block',
                value: 'The'
            }, {
                range: [11, 20],
                type: 'Block',
                value: 'Answer'
            }]
        },

        '/* multiline\ncomment\nshould\nbe\nignored */ 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                raw: '42',
                range: [42, 43],
                loc: {
                    start: { line: 5, column: 11 },
                    end: { line: 5, column: 13 }
                }
            },
            range: [42, 43],
            loc: {
                start: { line: 5, column: 11 },
                end: { line: 5, column: 13 }
            }
        },

        '// line comment\n42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                raw: '42',
                range: [16, 17],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 2 }
                }
            },
            range: [16, 17],
            loc: {
                start: { line: 2, column: 0 },
                end: { line: 2, column: 2 }
            }
        },

        '// Hello, world!\n42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [17, 18],
                    loc: {
                        start: { line: 2, column: -1 },
                        end: { line: 2, column: 1 }
                    }
                },
                range: [17, 18],
                loc: {
                    start: { line: 2, column: -1 },
                    end: { line: 2, column: 1 }
                }
            }],
            range: [17, 18],
            loc: {
                start: { line: 2, column: -1 },
                end: { line: 2, column: 1 }
            },
            comments: [{
                range: [0, 16],
                type: 'Line',
                value: ' Hello, world!'
            }]
        },

        '//\n42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [3, 4],
                    loc: {
                        start: { line: 2, column: -1 },
                        end: { line: 2, column: 1 }
                    }
                },
                range: [3, 4],
                loc: {
                    start: { line: 2, column: -1 },
                    end: { line: 2, column: 1 }
                }
            }],
            range: [3, 4],
            loc: {
                start: { line: 2, column: -1 },
                end: { line: 2, column: 1 }
            },
            comments: [{
                range: [0, 2],
                type: 'Line',
                value: ''
            }]
        },

        '/**/42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [4, 5],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 6 }
                }
            }],
            range: [4, 5],
            loc: {
                start: { line: 1, column: 4 },
                end: { line: 1, column: 6 }
            },
            comments: [{
                range: [0, 3],
                type: 'Block',
                value: ''
            }]
        },

        '// Hello, world!\n\n//   Another hello\n42': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [37, 38],
                    loc: {
                        start: { line: 4, column: -1 },
                        end: { line: 4, column: 1 }
                    }
                },
                range: [37, 38],
                loc: {
                    start: { line: 4, column: -1 },
                    end: { line: 4, column: 1 }
                }
            }],
            range: [37, 38],
            loc: {
                start: { line: 4, column: -1 },
                end: { line: 4, column: 1 }
            },
            comments: [{
                range: [0, 16],
                type: 'Line',
                value: ' Hello, world!'
            }, {
                range: [18, 36],
                type: 'Line',
                value: '   Another hello'
            }]
        },

        'if (x) { // Some comment\ndoThat(); }': {
            type: 'Program',
            body: [{
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                consequent: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'doThat',
                                range: [25, 30],
                                loc: {
                                    start: { line: 2, column: -1 },
                                    end: { line: 2, column: 5 }
                                }
                            },
                            'arguments': [],
                            range: [25, 32],
                            loc: {
                                start: { line: 2, column: -1 },
                                end: { line: 2, column: 7 }
                            }
                        },
                        range: [25, 33],
                        loc: {
                            start: { line: 2, column: -1 },
                            end: { line: 2, column: 8 }
                        }
                    }],
                    range: [7, 35],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 2, column: 10 }
                    }
                },
                alternate: null,
                range: [0, 35],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 10 }
                }
            }],
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 10 }
            },
            comments: [{
                range: [9, 24],
                type: 'Line',
                value: ' Some comment'
            }]
        },

        'switch (answer) { case 42: /* perfect */ bingo() }': {
            type: 'Program',
            body: [{
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer',
                    range: [8, 13],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 14 }
                    }
                },
                cases: [{
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [23, 24],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 25 }
                        }
                    },
                    consequent: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'bingo',
                                range: [41, 45],
                                loc: {
                                    start: { line: 1, column: 41 },
                                    end: { line: 1, column: 46 }
                                }
                            },
                            'arguments': [],
                            range: [41, 47],
                            loc: {
                                start: { line: 1, column: 41 },
                                end: { line: 1, column: 48 }
                            }
                        },
                        range: [41, 48],
                        loc: {
                            start: { line: 1, column: 41 },
                            end: { line: 1, column: 49 }
                        }
                    }],
                    range: [41, 48],
                    loc: {
                        start: { line: 1, column: 41 },
                        end: { line: 1, column: 49 }
                    }
                }],
                range: [0, 49],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 50 }
                }
            }],
            range: [0, 49],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 50 }
            },
            comments: [{
                range: [27, 39],
                type: 'Block',
                value: ' perfect '
            }]
        }

    },

    'Numeric Literals': {

        '0': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0',
                range: [0, 0],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 1 }
                }
            },
            range: [0, 0],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 1 }
            }
        },

        '42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                raw: '42',
                range: [0, 1],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '.14': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0.14,
                raw: '.14',
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '3.14159': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 3.14159,
                raw: '3.14159',
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '6.02214179e+23': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 6.02214179e+23,
                raw: '6.02214179e+23',
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        '1.492417830e-10': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 1.49241783e-10,
                raw: '1.492417830e-10',
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '0x0': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0x0',
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0e+100': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0e+100',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '0xabc': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0xabc,
                raw: '0xabc',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '0xdef': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0xdef,
                raw: '0xdef',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '0X1A': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0x1A,
                raw: '0X1A',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        '0x10': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0x10,
                raw: '0x10',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        '0x100': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0x100,
                raw: '0x100',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '0X04': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0X04,
                raw: '0X04',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        '02': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 2,
                raw: '02',
                range: [0, 1],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '012': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 10,
                raw: '012',
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0012': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 10,
                raw: '0012',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        }

    },

    'String Literals': {

        '"Hello"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello',
                raw: '"Hello"',
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: '\n\r\t\v\b\f\\\'"\x00',
                raw: '"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"',
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        '"\\u0061"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'a',
                raw: '"\\u0061"',
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        '"\\x61"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'a',
                raw: '"\\x61"',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '"\\u00"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'u00',
                raw: '"\\u00"',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '"\\xt"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'xt',
                raw: '"\\xt"',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '"Hello\\nworld"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\nworld',
                raw: '"Hello\\nworld"',
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        '"Hello\\\nworld"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Helloworld',
                raw: '"Hello\\\nworld"',
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 14 }
            }
        },

        '"Hello\\02World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u0002World',
                raw: '"Hello\\02World"',
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '"Hello\\012World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u000AWorld',
                raw: '"Hello\\012World"',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\122World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\122World',
                raw: '"Hello\\122World"',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\0122World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u000A2World',
                raw: '"Hello\\0122World"',
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        '"Hello\\312World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u00CAWorld',
                raw: '"Hello\\312World"',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\412World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\412World',
                raw: '"Hello\\412World"',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\812World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello812World',
                raw: '"Hello\\812World"',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\712World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\712World',
                raw: '"Hello\\712World"',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '"Hello\\0World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u0000World',
                raw: '"Hello\\0World"',
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        '"Hello\\\r\nworld"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Helloworld',
                raw: '"Hello\\\r\nworld"',
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 15 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 15 }
            }
        },

        '"Hello\\1World"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 'Hello\u0001World',
                raw: '"Hello\\1World"',
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        }
    },

    'Regular Expression Literals': {

        'var x = /[a-z]/i': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/[a-z]/i',
                        raw: '/[a-z]/i',
                        range: [8, 15],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 16 }
                        }
                    },
                    range: [4, 15],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 16 }
                    }
                }],
                kind: 'var',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            }],
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 2]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 4]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 6]
            }, {
                type: 'RegularExpression',
                value: '/[a-z]/i',
                range: [8, 15]
            }]
        },

        'var x = /[P QR]/i': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/[P QR]/i',
                        raw: '/[P QR]/i',
                        range: [8, 16],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    range: [4, 16],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 17 }
                    }
                }],
                kind: 'var',
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            }],
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 2]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 4]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 6]
            }, {
                type: 'RegularExpression',
                value: '/[P QR]/i',
                range: [8, 16]
            }]
        },

        'var x = /foo\\/bar/': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/foo\\/bar/',
                        raw: '/foo\\/bar/',
                        range: [8, 17],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 18 }
                    }
                }],
                kind: 'var',
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            }],
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 2]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 4]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 6]
            }, {
                type: 'RegularExpression',
                value: '/foo\\/bar/',
                range: [8, 17]
            }]
        },

        'var x = /=([^=\\s])+/g': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/=([^=\\s])+/g',
                        raw: '/=([^=\\s])+/g',
                        range: [8, 20],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    range: [4, 20],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 21 }
                    }
                }],
                kind: 'var',
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            }],
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 2]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 4]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 6]
            }, {
                type: 'RegularExpression',
                value: '/=([^=\\s])+/g',
                range: [8, 20]
            }]
        },

        'var x = /[P QR]/\\u0067': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/[P QR]/g',
                        raw: '/[P QR]/\\u0067',
                        range: [8, 21],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    range: [4, 21],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 22 }
                    }
                }],
                kind: 'var',
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            }],
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 2]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 4]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 6]
            }, {
                type: 'RegularExpression',
                value: '/[P QR]/\\u0067',
                range: [8, 21]
            }]
        },

        'var x = /[P QR]/\\g': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: '/[P QR]/g',
                        raw: '/[P QR]/\\g',
                        range: [8, 17],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 18 }
                    }
                }],
                kind: 'var',
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            }],
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            },
            tokens: [{
                type: 'Keyword',
                value: 'var',
                range: [0, 2]
            }, {
                type: 'Identifier',
                value: 'x',
                range: [4, 4]
            }, {
                type: 'Punctuator',
                value: '=',
                range: [6, 6]
            }, {
                type: 'RegularExpression',
                value: '/[P QR]/\\g',
                range: [8, 17]
            }]
        }

    },

    'Left-Hand-Side Expression': {

        'new Button': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'Identifier',
                    name: 'Button',
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 10 }
                    }
                },
                'arguments': [],
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        },

        'new Button()': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'Identifier',
                    name: 'Button',
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 10 }
                    }
                },
                'arguments': [],
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        'new new foo': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [8, 10],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    'arguments': [],
                    range: [4, 10],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 11 }
                    }
                },
                'arguments': [],
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'new new foo()': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [8, 10],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    'arguments': [],
                    range: [4, 12],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 13 }
                    }
                },
                'arguments': [],
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'new foo().bar()': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'foo',
                            range: [4, 6],
                            loc: {
                                start: { line: 1, column: 4 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        'arguments': [],
                        range: [0, 8],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [10, 12],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [0, 12],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 13 }
                    }
                },
                'arguments': [],
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        'new foo.bar()': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [4, 6],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [8, 10],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    range: [4, 10],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 11 }
                    }
                },
                'arguments': [],
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'foo(bar, baz)': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'foo',
                    range: [0, 2],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                },
                'arguments': [{
                    type: 'Identifier',
                    name: 'bar',
                    range: [4, 6],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'baz',
                    range: [9, 11],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 12 }
                    }
                }],
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'universe.milkyway': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 7],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'milkyway',
                    range: [9, 16],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'universe.milkyway.solarsystem': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'Identifier',
                        name: 'universe',
                        range: [0, 7],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'milkyway',
                        range: [9, 16],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    range: [0, 16],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 17 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'solarsystem',
                    range: [18, 28],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 29 }
                    }
                },
                range: [0, 28],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 29 }
                }
            },
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'universe.milkyway.solarsystem.Earth': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Identifier',
                            name: 'universe',
                            range: [0, 7],
                            loc: {
                                start: { line: 1, column: 0 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'milkyway',
                            range: [9, 16],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        range: [0, 16],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'solarsystem',
                        range: [18, 28],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    range: [0, 28],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 29 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'Earth',
                    range: [30, 34],
                    loc: {
                        start: { line: 1, column: 30 },
                        end: { line: 1, column: 35 }
                    }
                },
                range: [0, 34],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 35 }
                }
            },
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 35 }
            }
        },

        'universe[galaxyName, otherUselessName]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: true,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 7],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'SequenceExpression',
                    expressions: [{
                        type: 'Identifier',
                        name: 'galaxyName',
                        range: [9, 18],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 19 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'otherUselessName',
                        range: [21, 36],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 37 }
                        }
                    }],
                    range: [9, 36],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 37 }
                    }
                },
                range: [0, 37],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 38 }
                }
            },
            range: [0, 37],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        'universe[galaxyName]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: true,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 7],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'galaxyName',
                    range: [9, 18],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 19 }
                    }
                },
                range: [0, 19],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'universe[42].galaxies': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                        type: 'Identifier',
                        name: 'universe',
                        range: [0, 7],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    property: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    range: [0, 11],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 12 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'galaxies',
                    range: [13, 20],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'universe(42).galaxies': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'universe',
                        range: [0, 7],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    'arguments': [{
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 11 }
                        }
                    }],
                    range: [8, 11],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 12 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'galaxies',
                    range: [13, 20],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [8, 20],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'universe(42).galaxies(14, 3, 77).milkyway': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'universe',
                                range: [0, 7],
                                loc: {
                                    start: { line: 1, column: 0 },
                                    end: { line: 1, column: 8 }
                                }
                            },
                            'arguments': [{
                                type: 'Literal',
                                value: 42,
                                raw: '42',
                                range: [9, 10],
                                loc: {
                                    start: { line: 1, column: 9 },
                                    end: { line: 1, column: 11 }
                                }
                            }],
                            range: [8, 11],
                            loc: {
                                start: { line: 1, column: 8 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'galaxies',
                            range: [13, 20],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 21 }
                            }
                        },
                        range: [8, 20],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    'arguments': [{
                        type: 'Literal',
                        value: 14,
                        raw: '14',
                        range: [22, 23],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 24 }
                        }
                    }, {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [26, 26],
                        loc: {
                            start: { line: 1, column: 26 },
                            end: { line: 1, column: 27 }
                        }
                    }, {
                        type: 'Literal',
                        value: 77,
                        raw: '77',
                        range: [29, 30],
                        loc: {
                            start: { line: 1, column: 29 },
                            end: { line: 1, column: 31 }
                        }
                    }],
                    range: [21, 31],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 32 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'milkyway',
                    range: [33, 40],
                    loc: {
                        start: { line: 1, column: 33 },
                        end: { line: 1, column: 41 }
                    }
                },
                range: [21, 40],
                loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 41 }
                }
            },
            range: [0, 40],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 41 }
            }
        },

        'earth.asia.Indonesia.prepareForElection(2014)': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'earth',
                                range: [0, 4],
                                loc: {
                                    start: { line: 1, column: 0 },
                                    end: { line: 1, column: 5 }
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'asia',
                                range: [6, 9],
                                loc: {
                                    start: { line: 1, column: 6 },
                                    end: { line: 1, column: 10 }
                                }
                            },
                            range: [0, 9],
                            loc: {
                                start: { line: 1, column: 0 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'Indonesia',
                            range: [11, 19],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        range: [0, 19],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'prepareForElection',
                        range: [21, 38],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 39 }
                        }
                    },
                    range: [0, 38],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 39 }
                    }
                },
                'arguments': [{
                    type: 'Literal',
                    value: 2014,
                    raw: '2014',
                    range: [40, 43],
                    loc: {
                        start: { line: 1, column: 40 },
                        end: { line: 1, column: 44 }
                    }
                }],
                range: [0, 44],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 45 }
                }
            },
            range: [0, 44],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 45 }
            }
        },

        'universe.if': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 7],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'if',
                    range: [9, 10],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'universe.true': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 7],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'true',
                    range: [9, 12],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'universe.false': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 7],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'false',
                    range: [9, 13],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'universe.null': {
            type: 'ExpressionStatement',
            expression: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe',
                    range: [0, 7],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 8 }
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'null',
                    range: [9, 12],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        }

    },

    'Postfix Expressions': {

        'x++': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                prefix: false,
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        'x--': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                prefix: false,
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        'eval++': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                prefix: false,
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'eval--': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                prefix: false,
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'arguments++': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                },
                prefix: false,
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'arguments--': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                },
                prefix: false,
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        }

    },

    'Unary Operators': {

        '++x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [2, 2],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 3 }
                    }
                },
                prefix: true,
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '--x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [2, 2],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 3 }
                    }
                },
                prefix: true,
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '++eval': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [2, 5],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 6 }
                    }
                },
                prefix: true,
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '--eval': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [2, 5],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 6 }
                    }
                },
                prefix: true,
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '++arguments': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [2, 10],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 11 }
                    }
                },
                prefix: true,
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        '--arguments': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [2, 10],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 11 }
                    }
                },
                prefix: true,
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        '+x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: '+',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 1],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 1],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '-x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: '-',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 1],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 1],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '~x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: '~',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 1],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 1],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '!x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: '!',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 1],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 1],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        'void x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: 'void',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'delete x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: 'delete',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [7, 7],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'typeof x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'UnaryExpression',
                operator: 'typeof',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [7, 7],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        }

    },

    'Multiplicative Operators': {

        'x * y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x / y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '/',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x % y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '%',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        }

    },

    'Additive Operators': {

        'x + y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x - y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        }

    },

    'Bitwise Shift Operator': {

        'x << y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '<<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x >> y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '>>',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x >>> y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '>>>',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [6, 6],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        }

    },

    'Relational Operators': {

        'x < y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x > y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '>',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x <= y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '<=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x >= y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '>=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x in y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: 'in',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x instanceof y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: 'instanceof',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [13, 13],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        }

    },

    'Equality Operators': {

        'x == y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '==',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x != y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '!=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x === y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '===',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [6, 6],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x !== y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '!==',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [6, 6],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        }

    },

    'Binary Bitwise Operators': {

        'x & y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '&',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x ^ y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '^',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'x | y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        }

    },

    'Binary Expressions': {

        'x + y + z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x - y + z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'BinaryExpression',
                    operator: '-',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x + y - z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x - y - z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'BinaryExpression',
                    operator: '-',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x + y * z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [8, 8],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [4, 8],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x + y / z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '/',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [8, 8],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [4, 8],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x - y % z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '%',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [8, 8],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [4, 8],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x * y * z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x * y / z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '/',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x * y % z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '%',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x % y * z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '%',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x << y << z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '<<',
                left: {
                    type: 'BinaryExpression',
                    operator: '<<',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 5],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [10, 10],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x | y | z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'BinaryExpression',
                    operator: '|',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x & y & z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '&',
                left: {
                    type: 'BinaryExpression',
                    operator: '&',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x ^ y ^ z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '^',
                left: {
                    type: 'BinaryExpression',
                    operator: '^',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x & y | z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'BinaryExpression',
                    operator: '&',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x | y ^ z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '^',
                left: {
                    type: 'BinaryExpression',
                    operator: '|',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x | y & z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '&',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [8, 8],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [4, 8],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        }

    },

    'Binary Logical Operators': {

        'x || y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x && y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '&&',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'x || y || z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'LogicalExpression',
                    operator: '||',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 5],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [10, 10],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x && y && z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '&&',
                left: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 5],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z',
                    range: [10, 10],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x || y && z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 5],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [10, 10],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    range: [5, 10],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'x || y ^ z': {
            type: 'ExpressionStatement',
            expression: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '^',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 5],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        range: [9, 9],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    range: [5, 9],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        }

    },

    'Conditional Operator': {

        'y ? 1 : 2': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ConditionalExpression',
                test: {
                    type: 'Identifier',
                    name: 'y',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                consequent: {
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                alternate: {
                    type: 'Literal',
                    value: 2,
                    raw: '2',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x && y ? 1 : 2': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ConditionalExpression',
                test: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [0, 0],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 1 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 5],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                consequent: {
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [9, 9],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                },
                alternate: {
                    type: 'Literal',
                    value: 2,
                    raw: '2',
                    range: [13, 13],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        }

    },

    'Assignment Operators': {

        'x = 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'eval = 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'arguments = 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [0, 8],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [12, 13],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'x *= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '*=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x /= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '/=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x %= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '%=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x += 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '+=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x -= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '-=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x <<= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '<<=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'x >>= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '>>=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'x >>>= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '>>>=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'x &= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '&=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x ^= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '^=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'x |= 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '|=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '1 = 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        '(1 + 1) = 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [1, 1],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 2 }
                        }
                    },
                    right: {
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [5, 5],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 7 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        }

    },

    'Block': {

        '{ foo }': {
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'foo',
                    range: [2, 4],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [2, 5],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 6 }
                }
            }],
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '{ doThis(); doThat(); }': {
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'doThis',
                        range: [2, 7],
                        loc: {
                            start: { line: 1, column: 2 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    'arguments': [],
                    range: [2, 9],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [2, 10],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 11 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'doThat',
                        range: [12, 17],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    'arguments': [],
                    range: [12, 19],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 20 }
                    }
                },
                range: [12, 20],
                loc: {
                    start: { line: 1, column: 12 },
                    end: { line: 1, column: 21 }
                }
            }],
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        '{}': {
            type: 'BlockStatement',
            body: [],
            range: [0, 1],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        }

    },

    'Variable Statement': {

        'var x': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: null,
                range: [4, 4],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            }],
            kind: 'var',
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        'var x, y;': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: null,
                range: [4, 4],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'y',
                    range: [7, 7],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                init: null,
                range: [7, 7],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 8 }
                }
            }],
            kind: 'var',
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'var x = 42': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [4, 9],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 10 }
                }
            }],
            kind: 'var',
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        },

        'var eval = 42, arguments = 42': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [4, 7],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 8 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [11, 12],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [4, 12],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 13 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [15, 23],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 24 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [27, 28],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 29 }
                    }
                },
                range: [15, 28],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 29 }
                }
            }],
            kind: 'var',
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'var x = 14, y = 3, z = 1977': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 14,
                    raw: '14',
                    range: [8, 9],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [4, 9],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 10 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'y',
                    range: [12, 12],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 13 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 3,
                    raw: '3',
                    range: [16, 16],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [12, 16],
                loc: {
                    start: { line: 1, column: 12 },
                    end: { line: 1, column: 17 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'z',
                    range: [19, 19],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 1977,
                    raw: '1977',
                    range: [23, 26],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [19, 26],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 27 }
                }
            }],
            kind: 'var',
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'var implements, interface, package': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'implements',
                    range: [4, 13],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 14 }
                    }
                },
                init: null,
                range: [4, 13],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 14 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'interface',
                    range: [16, 24],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 25 }
                    }
                },
                init: null,
                range: [16, 24],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 25 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'package',
                    range: [27, 33],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 34 }
                    }
                },
                init: null,
                range: [27, 33],
                loc: {
                    start: { line: 1, column: 27 },
                    end: { line: 1, column: 34 }
                }
            }],
            kind: 'var',
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'var private, protected, public, static': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'private',
                    range: [4, 10],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 11 }
                    }
                },
                init: null,
                range: [4, 10],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'protected',
                    range: [13, 21],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 22 }
                    }
                },
                init: null,
                range: [13, 21],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 22 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'public',
                    range: [24, 29],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 30 }
                    }
                },
                init: null,
                range: [24, 29],
                loc: {
                    start: { line: 1, column: 24 },
                    end: { line: 1, column: 30 }
                }
            }, {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'static',
                    range: [32, 37],
                    loc: {
                        start: { line: 1, column: 32 },
                        end: { line: 1, column: 38 }
                    }
                },
                init: null,
                range: [32, 37],
                loc: {
                    start: { line: 1, column: 32 },
                    end: { line: 1, column: 38 }
                }
            }],
            kind: 'var',
            range: [0, 37],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        }

    },

    'Let Statement': {

        'let x': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: null,
                range: [4, 4],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            }],
            kind: 'let',
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },

        '{ let x }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [6, 6],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: null,
                    range: [6, 6],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                }],
                kind: 'let',
                range: [2, 7],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 8 }
                }
            }],
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        '{ let x = 42 }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [6, 6],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [10, 11],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    range: [6, 11],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 12 }
                    }
                }],
                kind: 'let',
                range: [2, 12],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 13 }
                }
            }],
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        '{ let x = 14, y = 3, z = 1977 }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [6, 6],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 14,
                        raw: '14',
                        range: [10, 11],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    range: [6, 11],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 12 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y',
                        range: [14, 14],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [18, 18],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    range: [14, 18],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 19 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'z',
                        range: [21, 21],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 1977,
                        raw: '1977',
                        range: [25, 28],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    range: [21, 28],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 29 }
                    }
                }],
                kind: 'let',
                range: [2, 29],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 30 }
                }
            }],
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        }

    },

    'Const Statement': {

        'const x = 42': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [6, 6],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [6, 11],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 12 }
                }
            }],
            kind: 'const',
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        '{ const x = 42 }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 8],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [8, 13],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 14 }
                    }
                }],
                kind: 'const',
                range: [2, 14],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 15 }
                }
            }],
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '{ const x = 14, y = 3, z = 1977 }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 8],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 14,
                        raw: '14',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [8, 13],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 14 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y',
                        range: [16, 16],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [20, 20],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    range: [16, 20],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 21 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'z',
                        range: [23, 23],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 1977,
                        raw: '1977',
                        range: [27, 30],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [23, 30],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 31 }
                    }
                }],
                kind: 'const',
                range: [2, 31],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 32 }
                }
            }],
            range: [0, 32],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        }

    },

    'Empty Statement': {

        ';': {
            type: 'EmptyStatement',
            range: [0, 0],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 1 }
            }
        }

    },

    'Expression Statement': {

        'x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'x',
                range: [0, 0],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 1 }
                }
            },
            range: [0, 0],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 1 }
            }
        },

        'x, y': {
            type: 'ExpressionStatement',
            expression: {
                type: 'SequenceExpression',
                expressions: [{
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'y',
                    range: [3, 3],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 4 }
                    }
                }],
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        '\\u0061': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'a',
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 6 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 6 }
            }
        },

        'a\\u0061': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'aa',
                range: [0, 6],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 6],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        '\\ua': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'ua',
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        'a\\u': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'au',
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        }

    },

    'If Statement': {

        'if (morning) goodMorning()': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 10],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'goodMorning',
                        range: [13, 23],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    'arguments': [],
                    range: [13, 25],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 26 }
                    }
                },
                range: [13, 25],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 26 }
                }
            },
            alternate: null,
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'if (morning) (function(){})': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 10],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [24, 25],
                        loc: {
                            start: { line: 1, column: 24 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    range: [13, 26],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [13, 26],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 27 }
                }
            },
            alternate: null,
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'if (morning) var x = 0;': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 10],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [17, 17],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 0,
                        raw: '0',
                        range: [21, 21],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    range: [17, 21],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 22 }
                    }
                }],
                kind: 'var',
                range: [13, 22],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 23 }
                }
            },
            alternate: null,
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        'if (morning) function a(){}': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 10],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a',
                    range: [22, 22],
                    loc: {
                        start: { line: 1, column: 22 },
                        end: { line: 1, column: 23 }
                    }
                },
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [25, 26],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [13, 26],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 27 }
                }
            },
            alternate: null,
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'if (morning) goodMorning(); else goodDay()': {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'morning',
                range: [4, 10],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            consequent: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'goodMorning',
                        range: [13, 23],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    'arguments': [],
                    range: [13, 25],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 26 }
                    }
                },
                range: [13, 26],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 27 }
                }
            },
            alternate: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'goodDay',
                        range: [33, 39],
                        loc: {
                            start: { line: 1, column: 33 },
                            end: { line: 1, column: 40 }
                        }
                    },
                    'arguments': [],
                    range: [33, 41],
                    loc: {
                        start: { line: 1, column: 33 },
                        end: { line: 1, column: 42 }
                    }
                },
                range: [33, 41],
                loc: {
                    start: { line: 1, column: 33 },
                    end: { line: 1, column: 42 }
                }
            },
            range: [0, 41],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 42 }
            }
        }

    },

    'Iteration Statements': {

        'do keep(); while (true)': {
            type: 'DoWhileStatement',
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'keep',
                        range: [3, 6],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    'arguments': [],
                    range: [3, 8],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [3, 9],
                loc: {
                    start: { line: 1, column: 3 },
                    end: { line: 1, column: 10 }
                }
            },
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [18, 21],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        'do { x++; y--; } while (x < 10)': {
            type: 'DoWhileStatement',
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '++',
                        argument: {
                            type: 'Identifier',
                            name: 'x',
                            range: [5, 5],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        prefix: false,
                        range: [5, 7],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    range: [5, 8],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 9 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '--',
                        argument: {
                            type: 'Identifier',
                            name: 'y',
                            range: [10, 10],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 11 }
                            }
                        },
                        prefix: false,
                        range: [10, 12],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [10, 13],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 14 }
                    }
                }],
                range: [3, 15],
                loc: {
                    start: { line: 1, column: 3 },
                    end: { line: 1, column: 16 }
                }
            },
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [24, 24],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 25 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 10,
                    raw: '10',
                    range: [28, 29],
                    loc: {
                        start: { line: 1, column: 28 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [24, 29],
                loc: {
                    start: { line: 1, column: 24 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        },

        '{ do { } while (false) false }': {
            type: 'BlockStatement',
            body: [{
                type: 'DoWhileStatement',
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [5, 7],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 8 }
                    }
                },
                test: {
                    type: 'Literal',
                    value: false,
                    raw: 'false',
                    range: [16, 20],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [2, 21],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 22 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: false,
                    raw: 'false',
                    range: [23, 27],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 28 }
                    }
                },
                range: [23, 28],
                loc: {
                    start: { line: 1, column: 23 },
                    end: { line: 1, column: 29 }
                }
            }],
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'while (true) doSomething()': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 10],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'doSomething',
                        range: [13, 23],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    'arguments': [],
                    range: [13, 25],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 26 }
                    }
                },
                range: [13, 25],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 26 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'while (x < 10) { x++; y--; }': {
            type: 'WhileStatement',
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [7, 7],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 10,
                    raw: '10',
                    range: [11, 12],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 13 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '++',
                        argument: {
                            type: 'Identifier',
                            name: 'x',
                            range: [17, 17],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 18 }
                            }
                        },
                        prefix: false,
                        range: [17, 19],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    range: [17, 20],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 21 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '--',
                        argument: {
                            type: 'Identifier',
                            name: 'y',
                            range: [22, 22],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 23 }
                            }
                        },
                        prefix: false,
                        range: [22, 24],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 25 }
                        }
                    },
                    range: [22, 25],
                    loc: {
                        start: { line: 1, column: 22 },
                        end: { line: 1, column: 26 }
                    }
                }],
                range: [15, 27],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 28 }
                }
            },
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'for(;;);': {
            type: 'ForStatement',
            init: null,
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [7, 7],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'for(;;){}': {
            type: 'ForStatement',
            init: null,
            test: null,
            update: null,
            body: {
                type: 'BlockStatement',
                body: [],
                range: [7, 8],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'for(x = 0;;);': {
            type: 'ForStatement',
            init: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 0,
                    raw: '0',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [4, 8],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 9 }
                }
            },
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [12, 12],
                loc: {
                    start: { line: 1, column: 12 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'for(var x = 0;;);': {
            type: 'ForStatement',
            init: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 8],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 0,
                        raw: '0',
                        range: [12, 12],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [8, 12],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                }],
                kind: 'var',
                range: [4, 12],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 13 }
                }
            },
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [16, 16],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'for(let x = 0;;);': {
            type: 'ForStatement',
            init: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 8],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 0,
                        raw: '0',
                        range: [12, 12],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [8, 12],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                }],
                kind: 'let',
                range: [4, 12],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 13 }
                }
            },
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [16, 16],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'for(var x = 0, y = 1;;);': {
            type: 'ForStatement',
            init: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 8],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 0,
                        raw: '0',
                        range: [12, 12],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [8, 12],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y',
                        range: [15, 15],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 16 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [19, 19],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    range: [15, 19],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 20 }
                    }
                }],
                kind: 'var',
                range: [4, 19],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 20 }
                }
            },
            test: null,
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [23, 23],
                loc: {
                    start: { line: 1, column: 23 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'for(x = 0; x < 42;);': {
            type: 'ForStatement',
            init: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 0,
                    raw: '0',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [4, 8],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 9 }
                }
            },
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [11, 11],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 12 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [15, 16],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [11, 16],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 17 }
                }
            },
            update: null,
            body: {
                type: 'EmptyStatement',
                range: [19, 19],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'for(x = 0; x < 42; x++);': {
            type: 'ForStatement',
            init: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 0,
                    raw: '0',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [4, 8],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 9 }
                }
            },
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [11, 11],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 12 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [15, 16],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [11, 16],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 17 }
                }
            },
            update: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [19, 19],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                    }
                },
                prefix: false,
                range: [19, 21],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 22 }
                }
            },
            body: {
                type: 'EmptyStatement',
                range: [23, 23],
                loc: {
                    start: { line: 1, column: 23 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'for(x = 0; x < 42; x++) process(x);': {
            type: 'ForStatement',
            init: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 0,
                    raw: '0',
                    range: [8, 8],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [4, 8],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 9 }
                }
            },
            test: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [11, 11],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 12 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [15, 16],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [11, 16],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 17 }
                }
            },
            update: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    range: [19, 19],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                    }
                },
                prefix: false,
                range: [19, 21],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 22 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [24, 30],
                        loc: {
                            start: { line: 1, column: 24 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [32, 32],
                        loc: {
                            start: { line: 1, column: 32 },
                            end: { line: 1, column: 33 }
                        }
                    }],
                    range: [24, 33],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 34 }
                    }
                },
                range: [24, 34],
                loc: {
                    start: { line: 1, column: 24 },
                    end: { line: 1, column: 35 }
                }
            },
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 35 }
            }
        },

        'for(x in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'Identifier',
                name: 'x',
                range: [4, 4],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [9, 12],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [15, 21],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [23, 23],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 24 }
                        }
                    }],
                    range: [15, 24],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 25 }
                    }
                },
                range: [15, 25],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 26 }
                }
            },
            each: false,
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'for((1 + 1) in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [5, 5],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                },
                right: {
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [9, 9],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [4, 10],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 11 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [15, 18],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 19 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [21, 27],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 28 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [29, 29],
                        loc: {
                            start: { line: 1, column: 29 },
                            end: { line: 1, column: 30 }
                        }
                    }],
                    range: [21, 30],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 31 }
                    }
                },
                range: [21, 31],
                loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 32 }
                }
            },
            each: false,
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 32 }
            }
        },

        'for (var x in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 9],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: null,
                    range: [9, 9],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                }],
                kind: 'var',
                range: [5, 9],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 10 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [14, 17],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 18 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [20, 26],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [28, 28],
                        loc: {
                            start: { line: 1, column: 28 },
                            end: { line: 1, column: 29 }
                        }
                    }],
                    range: [20, 29],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [20, 30],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 31 }
                }
            },
            each: false,
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        },

        'for (var x = 42 in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 9],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [9, 14],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 15 }
                    }
                }],
                kind: 'var',
                range: [5, 14],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 15 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [19, 22],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 23 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [25, 31],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [33, 33],
                        loc: {
                            start: { line: 1, column: 33 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [25, 34],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 35 }
                    }
                },
                range: [25, 35],
                loc: {
                    start: { line: 1, column: 25 },
                    end: { line: 1, column: 36 }
                }
            },
            each: false,
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'for (let x in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 9],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: null,
                    range: [9, 9],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                }],
                kind: 'let',
                range: [5, 9],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 10 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [14, 17],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 18 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [20, 26],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [28, 28],
                        loc: {
                            start: { line: 1, column: 28 },
                            end: { line: 1, column: 29 }
                        }
                    }],
                    range: [20, 29],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [20, 30],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 31 }
                }
            },
            each: false,
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        },

        'for (let x = 42 in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 9],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [9, 14],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 15 }
                    }
                }],
                kind: 'let',
                range: [5, 14],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 15 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [19, 22],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 23 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [25, 31],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [33, 33],
                        loc: {
                            start: { line: 1, column: 33 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [25, 34],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 35 }
                    }
                },
                range: [25, 35],
                loc: {
                    start: { line: 1, column: 25 },
                    end: { line: 1, column: 36 }
                }
            },
            each: false,
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'for (var i = function() { return 10 in [] } in list) process(x);': {
            type: 'ForInStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'i',
                        range: [9, 9],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'BinaryExpression',
                                    operator: 'in',
                                    left: {
                                        type: 'Literal',
                                        value: 10,
                                        raw: '10',
                                        range: [33, 34],
                                        loc: {
                                            start: { line: 1, column: 33 },
                                            end: { line: 1, column: 35 }
                                        }
                                    },
                                    right: {
                                        type: 'ArrayExpression',
                                        elements: [],
                                        range: [39, 40],
                                        loc: {
                                            start: { line: 1, column: 39 },
                                            end: { line: 1, column: 41 }
                                        }
                                    },
                                    range: [33, 40],
                                    loc: {
                                        start: { line: 1, column: 33 },
                                        end: { line: 1, column: 41 }
                                    }
                                },
                                range: [26, 41],
                                loc: {
                                    start: { line: 1, column: 26 },
                                    end: { line: 1, column: 42 }
                                }
                            }],
                            range: [24, 42],
                            loc: {
                                start: { line: 1, column: 24 },
                                end: { line: 1, column: 43 }
                            }
                        },
                        range: [13, 42],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 43 }
                        }
                    },
                    range: [9, 42],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 43 }
                    }
                }],
                kind: 'var',
                range: [5, 42],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 43 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [47, 50],
                loc: {
                    start: { line: 1, column: 47 },
                    end: { line: 1, column: 51 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [53, 59],
                        loc: {
                            start: { line: 1, column: 53 },
                            end: { line: 1, column: 60 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [61, 61],
                        loc: {
                            start: { line: 1, column: 61 },
                            end: { line: 1, column: 62 }
                        }
                    }],
                    range: [53, 62],
                    loc: {
                        start: { line: 1, column: 53 },
                        end: { line: 1, column: 63 }
                    }
                },
                range: [53, 63],
                loc: {
                    start: { line: 1, column: 53 },
                    end: { line: 1, column: 64 }
                }
            },
            each: false,
            range: [0, 63],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 64 }
            }
        }

    },

    'continue statement': {

        'while (true) { continue }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 10],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ContinueStatement',
                        label: null,
                        range: [15, 23],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 24 }
                        }
                    }
                ],
                range: [13, 24],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        'done: while (true) { continue done }': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'done',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [13, 16],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 17 }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ContinueStatement',
                            label: {
                                type: 'Identifier',
                                name: 'done',
                                range: [30, 33],
                                loc: {
                                    start: { line: 1, column: 30 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [21, 34],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 35 }
                            }
                        }
                    ],
                    range: [19, 35],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 36 }
                    }
                },
                range: [6, 35],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'done: while (true) { continue done; }': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'done',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [13, 16],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 17 }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ContinueStatement',
                            label: {
                                type: 'Identifier',
                                name: 'done',
                                range: [30, 33],
                                loc: {
                                    start: { line: 1, column: 30 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            range: [21, 34],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 35 }
                            }
                        }
                    ],
                    range: [19, 36],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 37 }
                    }
                },
                range: [6, 36],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 37 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 37 }
            }
        }

    },

    'break statement': {

        'while (true) { break }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 10],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'BreakStatement',
                        label: null,
                        range: [15, 20],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 21 }
                        }
                    }
                ],
                range: [13, 21],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'done: while (true) { break done }': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'done',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [13, 16],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 17 }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'BreakStatement',
                            label: {
                                type: 'Identifier',
                                name: 'done',
                                range: [27, 30],
                                loc: {
                                    start: { line: 1, column: 27 },
                                    end: { line: 1, column: 31 }
                                }
                            },
                            range: [21, 31],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 32 }
                            }
                        }
                    ],
                    range: [19, 32],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 33 }
                    }
                },
                range: [6, 32],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 33 }
                }
            },
            range: [0, 32],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        },

        'done: while (true) { break done; }': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'done',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [13, 16],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 17 }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'BreakStatement',
                            label: {
                                type: 'Identifier',
                                name: 'done',
                                range: [27, 30],
                                loc: {
                                    start: { line: 1, column: 27 },
                                    end: { line: 1, column: 31 }
                                }
                            },
                            range: [21, 31],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 32 }
                            }
                        }
                    ],
                    range: [19, 33],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 34 }
                    }
                },
                range: [6, 33],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 34 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        }

    },

    'return statement': {

        '(function(){ return })': {
           type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 19],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 20 }
                            }
                        }
                    ],
                    range: [11, 20],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        '(function(){ return; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 19],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 20 }
                            }
                        }
                    ],
                    range: [11, 21],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 22 }
                    }
                },
                range: [0, 22],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 23 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        '(function(){ return x; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'x',
                                range: [20, 20],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 21 }
                                }
                            },
                            range: [13, 21],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 22 }
                            }
                        }
                    ],
                    range: [11, 23],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 24 }
                    }
                },
                range: [0, 24],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        '(function(){ return x * y })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'BinaryExpression',
                                operator: '*',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [20, 20],
                                    loc: {
                                        start: { line: 1, column: 20 },
                                        end: { line: 1, column: 21 }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'y',
                                    range: [24, 24],
                                    loc: {
                                        start: { line: 1, column: 24 },
                                        end: { line: 1, column: 25 }
                                    }
                                },
                                range: [20, 24],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 25 }
                                }
                            },
                            range: [13, 25],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 26 }
                            }
                        }
                    ],
                    range: [11, 26],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [0, 27],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 28 }
                }
            },
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        }
    },

    'with statement': {

        'with (x) foo = bar': {
            type: 'WithStatement',
            object: {
                type: 'Identifier',
                name: 'x',
                range: [6, 6],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [9, 11],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [15, 17],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [9, 17],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [9, 17],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'with (x) foo = bar;': {
            type: 'WithStatement',
            object: {
                type: 'Identifier',
                name: 'x',
                range: [6, 6],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [9, 11],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [15, 17],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [9, 17],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [9, 18],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'with (x) { foo = bar }': {
            type: 'WithStatement',
            object: {
                type: 'Identifier',
                name: 'x',
                range: [6, 6],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            name: 'foo',
                            range: [11, 13],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        right: {
                            type: 'Identifier',
                            name: 'bar',
                            range: [17, 19],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        range: [11, 19],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    range: [11, 20],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 21 }
                    }
                }],
                range: [9, 21],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        }

    },

    'switch statement': {

        'switch (x) {}': {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'x',
                range: [8, 8],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'switch (answer) { case 42: hi(); break; }': {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'answer',
                range: [8, 13],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                }
            },
            cases: [{
                type: 'SwitchCase',
                test: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [23, 24],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 25 }
                    }
                },
                consequent: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'hi',
                            range: [27, 28],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        'arguments': [],
                        range: [27, 30],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [27, 31],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 32 }
                    }
                }, {
                    type: 'BreakStatement',
                    label: null,
                    range: [33, 38],
                    loc: {
                        start: { line: 1, column: 33 },
                        end: { line: 1, column: 39 }
                    }
                }],
                range: [27, 38],
                loc: {
                    start: { line: 1, column: 27 },
                    end: { line: 1, column: 39 }
                }
            }],
            range: [0, 40],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 41 }
            }
        },

        'switch (answer) { case 42: hi(); break; default: break }': {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'answer',
                range: [8, 13],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                }
            },
            cases: [{
                type: 'SwitchCase',
                test: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [23, 24],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 25 }
                    }
                },
                consequent: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'hi',
                            range: [27, 28],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        'arguments': [],
                        range: [27, 30],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [27, 31],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 32 }
                    }
                }, {
                    type: 'BreakStatement',
                    label: null,
                    range: [33, 38],
                    loc: {
                        start: { line: 1, column: 33 },
                        end: { line: 1, column: 39 }
                    }
                }],
                range: [27, 38],
                loc: {
                    start: { line: 1, column: 27 },
                    end: { line: 1, column: 39 }
                }
            }, {
                type: 'SwitchCase',
                test: null,
                consequent: [{
                    type: 'BreakStatement',
                    label: null,
                    range: [49, 54],
                    loc: {
                        start: { line: 1, column: 49 },
                        end: { line: 1, column: 55 }
                    }
                }],
                range: [49, 54],
                loc: {
                    start: { line: 1, column: 49 },
                    end: { line: 1, column: 55 }
                }
            }],
            range: [0, 55],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 56 }
            }
        }

    },

    'Labelled Statements': {

        'start: for (;;) break start': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'start',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            body: {
                type: 'ForStatement',
                init: null,
                test: null,
                update: null,
                body: {
                    type: 'BreakStatement',
                    label: {
                        type: 'Identifier',
                        name: 'start',
                        range: [22, 26],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    range: [16, 26],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [7, 26],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 27 }
                }
            },
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'start: while (true) break start': {
            type: 'LabeledStatement',
            label: {
                type: 'Identifier',
                name: 'start',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            body: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    range: [14, 17],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 18 }
                    }
                },
                body: {
                    type: 'BreakStatement',
                    label: {
                        type: 'Identifier',
                        name: 'start',
                        range: [26, 30],
                        loc: {
                            start: { line: 1, column: 26 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [20, 30],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 31 }
                    }
                },
                range: [7, 30],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 31 }
                }
            },
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        }

    },

    'throw statement': {

        'throw x;': {
            type: 'ThrowStatement',
            argument: {
                type: 'Identifier',
                name: 'x',
                range: [6, 6],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'throw x * y': {
            type: 'ThrowStatement',
            argument: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [6, 6],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'y',
                    range: [10, 10],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                range: [6, 10],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        'throw { message: "Error" }': {
            type: 'ThrowStatement',
            argument: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'message',
                        range: [8, 14],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    value: {
                        type: 'Literal',
                        value: 'Error',
                        raw: '"Error"',
                        range: [17, 23],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    kind: 'init',
                    range: [8, 23],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 24 }
                    }
                }],
                range: [6, 25],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 26 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        }

    },

    'try statement': {

        'try { } catch (e) { }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 6],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    range: [15, 15],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 16 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [18, 20],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [8, 20],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 21 }
                }
            }],
            finalizer: null,
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'try { } catch (eval) { }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 6],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'eval',
                    range: [15, 18],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 19 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [21, 23],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 24 }
                    }
                },
                range: [8, 23],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 24 }
                }
            }],
            finalizer: null,
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'try { } catch (arguments) { }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 6],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'arguments',
                    range: [15, 23],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 24 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [26, 28],
                    loc: {
                        start: { line: 1, column: 26 },
                        end: { line: 1, column: 29 }
                    }
                },
                range: [8, 28],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 29 }
                }
            }],
            finalizer: null,
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'try { } catch (e) { say(e) }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 6],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    range: [15, 15],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 16 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'say',
                                range: [20, 22],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 23 }
                                }
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'e',
                                range: [24, 24],
                                loc: {
                                    start: { line: 1, column: 24 },
                                    end: { line: 1, column: 25 }
                                }
                            }],
                            range: [20, 25],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 26 }
                            }
                        },
                        range: [20, 26],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    }],
                    range: [18, 27],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 28 }
                    }
                },
                range: [8, 27],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 28 }
                }
            }],
            finalizer: null,
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'try { } finally { cleanup(stuff) }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                range: [4, 6],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 7 }
                }
            },
            handlers: [],
            finalizer: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'cleanup',
                            range: [18, 24],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 25 }
                            }
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'stuff',
                            range: [26, 30],
                            loc: {
                                start: { line: 1, column: 26 },
                                end: { line: 1, column: 31 }
                            }
                        }],
                        range: [18, 31],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    range: [18, 32],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 33 }
                    }
                }],
                range: [16, 33],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 34 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'try { doThat(); } catch (e) { say(e) }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'doThat',
                            range: [6, 11],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        'arguments': [],
                        range: [6, 13],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [6, 14],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 15 }
                    }
                }],
                range: [4, 16],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 17 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    range: [25, 25],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 26 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'say',
                                range: [30, 32],
                                loc: {
                                    start: { line: 1, column: 30 },
                                    end: { line: 1, column: 33 }
                                }
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'e',
                                range: [34, 34],
                                loc: {
                                    start: { line: 1, column: 34 },
                                    end: { line: 1, column: 35 }
                                }
                            }],
                            range: [30, 35],
                            loc: {
                                start: { line: 1, column: 30 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        range: [30, 36],
                        loc: {
                            start: { line: 1, column: 30 },
                            end: { line: 1, column: 37 }
                        }
                    }],
                    range: [28, 37],
                    loc: {
                        start: { line: 1, column: 28 },
                        end: { line: 1, column: 38 }
                    }
                },
                range: [18, 37],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 38 }
                }
            }],
            finalizer: null,
            range: [0, 37],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        'try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }': {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'doThat',
                            range: [6, 11],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        'arguments': [],
                        range: [6, 13],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [6, 14],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 15 }
                    }
                }],
                range: [4, 16],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 17 }
                }
            },
            handlers: [{
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    range: [25, 25],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 26 }
                    }
                },
                guard: null,
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'say',
                                range: [30, 32],
                                loc: {
                                    start: { line: 1, column: 30 },
                                    end: { line: 1, column: 33 }
                                }
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'e',
                                range: [34, 34],
                                loc: {
                                    start: { line: 1, column: 34 },
                                    end: { line: 1, column: 35 }
                                }
                            }],
                            range: [30, 35],
                            loc: {
                                start: { line: 1, column: 30 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        range: [30, 36],
                        loc: {
                            start: { line: 1, column: 30 },
                            end: { line: 1, column: 37 }
                        }
                    }],
                    range: [28, 37],
                    loc: {
                        start: { line: 1, column: 28 },
                        end: { line: 1, column: 38 }
                    }
                },
                range: [18, 37],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 38 }
                }
            }],
            finalizer: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'cleanup',
                            range: [49, 55],
                            loc: {
                                start: { line: 1, column: 49 },
                                end: { line: 1, column: 56 }
                            }
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'stuff',
                            range: [57, 61],
                            loc: {
                                start: { line: 1, column: 57 },
                                end: { line: 1, column: 62 }
                            }
                        }],
                        range: [49, 62],
                        loc: {
                            start: { line: 1, column: 49 },
                            end: { line: 1, column: 63 }
                        }
                    },
                    range: [49, 63],
                    loc: {
                        start: { line: 1, column: 49 },
                        end: { line: 1, column: 64 }
                    }
                }],
                range: [47, 64],
                loc: {
                    start: { line: 1, column: 47 },
                    end: { line: 1, column: 65 }
                }
            },
            range: [0, 64],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 65 }
            }
        }

    },

    'debugger statement': {

        'debugger;': {
            type: 'DebuggerStatement',
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        }

    },

    'Function Definition': {

        'function hello() { sayHi(); }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'hello',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 14 }
                }
            },
            params: [],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'sayHi',
                            range: [19, 23],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 24 }
                            }
                        },
                        'arguments': [],
                        range: [19, 25],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    range: [19, 26],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 27 }
                    }
                }],
                range: [17, 28],
                loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 29 }
                }
            },
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'function eval() { }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'eval',
                range: [9, 12],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            params: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [16, 18],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'function arguments() { }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'arguments',
                range: [9, 17],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 18 }
                }
            },
            params: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [21, 23],
                loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'function eval() { function inner() { "use strict" } }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'eval',
                range: [9, 12],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            params: [],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'inner',
                        range: [27, 31],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Literal',
                                value: 'use strict',
                                raw: '\"use strict\"',
                                range: [37, 48],
                                loc: {
                                    start: { line: 1, column: 37 },
                                    end: { line: 1, column: 49 }
                                }
                            },
                            range: [37, 49],
                            loc: {
                                start: { line: 1, column: 37 },
                                end: { line: 1, column: 50 }
                            }
                        }],
                        range: [35, 50],
                        loc: {
                            start: { line: 1, column: 35 },
                            end: { line: 1, column: 51 }
                        }
                    },
                    range: [18, 50],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 51 }
                    }
                }],
                range: [16, 52],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 53 }
                }
            },
            range: [0, 52],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 53 }
            }
        },

        'function hello(a) { sayHi(); }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'hello',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 14 }
                }
            },
            params: [{
                type: 'Identifier',
                name: 'a',
                range: [15, 15],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 16 }
                }
            }],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'sayHi',
                            range: [20, 24],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 25 }
                            }
                        },
                        'arguments': [],
                        range: [20, 26],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    range: [20, 27],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 28 }
                    }
                }],
                range: [18, 29],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'function hello(a, b) { sayHi(); }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'hello',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 14 }
                }
            },
            params: [{
                type: 'Identifier',
                name: 'a',
                range: [15, 15],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 16 }
                }
            }, {
                type: 'Identifier',
                name: 'b',
                range: [18, 18],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 19 }
                }
            }],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'sayHi',
                            range: [23, 27],
                            loc: {
                                start: { line: 1, column: 23 },
                                end: { line: 1, column: 28 }
                            }
                        },
                        'arguments': [],
                        range: [23, 29],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 30 }
                        }
                    },
                    range: [23, 30],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 31 }
                    }
                }],
                range: [21, 32],
                loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 33 }
                }
            },
            range: [0, 32],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        },

        'var hi = function() { sayHi() };': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'hi',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                init: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'sayHi',
                                    range: [22, 26],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 27 }
                                    }
                                },
                                'arguments': [],
                                range: [22, 28],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 29 }
                                }
                            },
                            range: [22, 29],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 30 }
                            }
                        }],
                        range: [20, 30],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [9, 30],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 31 }
                    }
                },
                range: [4, 30],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 31 }
                }
            }],
            kind: 'var',
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 32 }
            }
        },

        'var hi = function eval() { };': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'hi',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                init: {
                    type: 'FunctionExpression',
                    id: {
                        type: 'Identifier',
                        name: 'eval',
                        range: [18, 21],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [25, 27],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 28 }
                        }
                    },
                    range: [9, 27],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 28 }
                    }
                },
                range: [4, 27],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 28 }
                }
            }],
            kind: 'var',
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'var hi = function arguments() { };': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'hi',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 6 }
                    }
                },
                init: {
                    type: 'FunctionExpression',
                    id: {
                        type: 'Identifier',
                        name: 'arguments',
                        range: [18, 26],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [30, 32],
                        loc: {
                            start: { line: 1, column: 30 },
                            end: { line: 1, column: 33 }
                        }
                    },
                    range: [9, 32],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 33 }
                    }
                },
                range: [4, 32],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 33 }
                }
            }],
            kind: 'var',
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'var hello = function hi() { sayHi() };': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'hello',
                    range: [4, 8],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                init: {
                    type: 'FunctionExpression',
                    id: {
                        type: 'Identifier',
                        name: 'hi',
                        range: [21, 22],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'sayHi',
                                    range: [28, 32],
                                    loc: {
                                        start: { line: 1, column: 28 },
                                        end: { line: 1, column: 33 }
                                    }
                                },
                                'arguments': [],
                                range: [28, 34],
                                loc: {
                                    start: { line: 1, column: 28 },
                                    end: { line: 1, column: 35 }
                                }
                            },
                            range: [28, 35],
                            loc: {
                                start: { line: 1, column: 28 },
                                end: { line: 1, column: 36 }
                            }
                        }],
                        range: [26, 36],
                        loc: {
                            start: { line: 1, column: 26 },
                            end: { line: 1, column: 37 }
                        }
                    },
                    range: [12, 36],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 37 }
                    }
                },
                range: [4, 36],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 37 }
                }
            }],
            kind: 'var',
            range: [0, 37],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        '(function(){})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [11, 12],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        }

    },

    'Automatic semicolon insertion': {

        '{ x\n++y }': {
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'x',
                    range: [2, 2],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 3 }
                    }
                },
                range: [2, 3],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    argument: {
                        type: 'Identifier',
                        name: 'y',
                        range: [6, 6],
                        loc: {
                            start: { line: 2, column: 2 },
                            end: { line: 2, column: 3 }
                        }
                    },
                    prefix: true,
                    range: [4, 6],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 3 }
                    }
                },
                range: [4, 7],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 4 }
                }
            }],
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 5 }
            }
        },

        '{ x\n--y }': {
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'x',
                    range: [2, 2],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 3 }
                    }
                },
                range: [2, 3],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '--',
                    argument: {
                        type: 'Identifier',
                        name: 'y',
                        range: [6, 6],
                        loc: {
                            start: { line: 2, column: 2 },
                            end: { line: 2, column: 3 }
                        }
                    },
                    prefix: true,
                    range: [4, 6],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 3 }
                    }
                },
                range: [4, 7],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 4 }
                }
            }],
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 5 }
            }
        },

        'var x /* comment */;': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 4],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: null,
                range: [4, 4],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            }],
            kind: 'var',
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        '{ var x = 14, y = 3\nz; }': {
            type: 'BlockStatement',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [6, 6],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 14,
                        raw: '14',
                        range: [10, 11],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    range: [6, 11],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 12 }
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y',
                        range: [14, 14],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 3,
                        raw: '3',
                        range: [18, 18],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    range: [14, 18],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 19 }
                    }
                }],
                kind: 'var',
                range: [2, 19],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'z',
                    range: [20, 20],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 1 }
                    }
                },
                range: [20, 21],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 2 }
                }
            }],
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 4 }
            }
        },

        'while (true) { continue\nthere; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 10],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {            
                type: 'BlockStatement',
                body: [{
                    type: 'ContinueStatement',
                    label: null,
                    range: [15, 22],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 23 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [24, 28],
                        loc: {
                            start: { line: 2, column: 0 },
                            end: { line: 2, column: 5 }
                        }
                    },
                    range: [24, 29],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 6 }
                    }
                }],
                range: [13, 31],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 8 }
                }
            },
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        'while (true) { continue // Comment\nthere; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 10],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {            
                type: 'BlockStatement',
                body: [{
                    type: 'ContinueStatement',
                    label: null,
                    range: [15, 22],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 23 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [35, 39],
                        loc: {
                            start: { line: 2, column: 0 },
                            end: { line: 2, column: 5 }
                        }
                    },
                    range: [35, 40],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 6 }
                    }
                }],
                range: [13, 42],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 8 }
                }
            },
            range: [0, 42],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        'while (true) { continue /* Multiline\nComment */there; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 10],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {            
                type: 'BlockStatement',
                body: [{
                    type: 'ContinueStatement',
                    label: null,
                    range: [15, 22],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 23 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [47, 51],
                        loc: {
                            start: { line: 2, column: 10 },
                            end: { line: 2, column: 15 }
                        }
                    },
                    range: [47, 52],
                    loc: {
                        start: { line: 2, column: 10 },
                        end: { line: 2, column: 16 }
                    }
                }],
                range: [13, 54],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 18 }
                }
            },
            range: [0, 54],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 18 }
            }
        },

        'while (true) { break\nthere; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 10],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {            
                type: 'BlockStatement',
                body: [{
                    type: 'BreakStatement',
                    label: null,
                    range: [15, 19],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 20 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [21, 25],
                        loc: {
                            start: { line: 2, column: 0 },
                            end: { line: 2, column: 5 }
                        }
                    },
                    range: [21, 26],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 6 }
                    }
                }],
                range: [13, 28],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 8 }
                }
            },
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        'while (true) { break // Comment\nthere; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 10],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {            
                type: 'BlockStatement',
                body: [{
                    type: 'BreakStatement',
                    label: null,
                    range: [15, 19],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 20 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [32, 36],
                        loc: {
                            start: { line: 2, column: 0 },
                            end: { line: 2, column: 5 }
                        }
                    },
                    range: [32, 37],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 6 }
                    }
                }],
                range: [13, 39],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 8 }
                }
            },
            range: [0, 39],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        'while (true) { break /* Multiline\nComment */there; }': {
            type: 'WhileStatement',
            test: {
                type: 'Literal',
                value: true,
                raw: 'true',
                range: [7, 10],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 11 }
                }
            },
            body: {            
                type: 'BlockStatement',
                body: [{
                    type: 'BreakStatement',
                    label: null,
                    range: [15, 19],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 20 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'there',
                        range: [44, 48],
                        loc: {
                            start: { line: 2, column: 10 },
                            end: { line: 2, column: 15 }
                        }
                    },
                    range: [44, 49],
                    loc: {
                        start: { line: 2, column: 10 },
                        end: { line: 2, column: 16 }
                    }
                }],
                range: [13, 51],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 2, column: 18 }
                }
            },
            range: [0, 51],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 18 }
            }
        },        

        '(function(){ return\nx; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 18],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Identifier',
                                name: 'x',
                                range: [20, 20],
                                loc: {
                                    start: { line: 2, column: 0 },
                                    end: { line: 2, column: 1 }
                                }
                            },
                            range: [20, 21],
                            loc: {
                                start: { line: 2, column: 0 },
                                end: { line: 2, column: 2 }
                            }
                        }
                    ],
                    range: [11, 23],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 2, column: 4 }
                    }
                },
                range: [0, 24],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 5 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 5 }
            }
        },

        '(function(){ return // Comment\nx; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 18],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Identifier',
                                name: 'x',
                                range: [31, 31],
                                loc: {
                                    start: { line: 2, column: 0 },
                                    end: { line: 2, column: 1 }
                                }
                            },
                            range: [31, 32],
                            loc: {
                                start: { line: 2, column: 0 },
                                end: { line: 2, column: 2 }
                            }
                        }
                    ],
                    range: [11, 34],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 2, column: 4 }
                    }
                },
                range: [0, 35],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 5 }
                }
            },
            range: [0, 35],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 5 }
            }
        },

        '(function(){ return/* Multiline\nComment */x; })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ReturnStatement',
                            argument: null,
                            range: [13, 18],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Identifier',
                                name: 'x',
                                range: [42, 42],
                                loc: {
                                    start: { line: 2, column: 10 },
                                    end: { line: 2, column: 11 }
                                }
                            },
                            range: [42, 43],
                            loc: {
                                start: { line: 2, column: 10 },
                                end: { line: 2, column: 12 }
                            }
                        }
                    ],
                    range: [11, 45],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 2, column: 14 }
                    }
                },
                range: [0, 46],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 2, column: 15 }
                }
            },
            range: [0, 46],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 15 }
            }
        },

        '{ throw error\nerror; }': {
            type: 'BlockStatement',
            body: [{
                type: 'ThrowStatement',
                argument: {
                    type: 'Identifier',
                    name: 'error',
                    range: [8, 12],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [2, 13],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'error',
                    range: [14, 18],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 5 }
                    }
                },
                range: [14, 19],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 6 }
                }
            }],
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        '{ throw error// Comment\nerror; }': {
            type: 'BlockStatement',
            body: [{
                type: 'ThrowStatement',
                argument: {
                    type: 'Identifier',
                    name: 'error',
                    range: [8, 12],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [2, 23],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 0 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'error',
                    range: [24, 28],
                    loc: {
                        start: { line: 2, column: 0 },
                        end: { line: 2, column: 5 }
                    }
                },
                range: [24, 29],
                loc: {
                    start: { line: 2, column: 0 },
                    end: { line: 2, column: 6 }
                }
            }],
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 8 }
            }
        },

        '{ throw error/* Multiline\nComment */error; }': {
            type: 'BlockStatement',
            body: [{
                type: 'ThrowStatement',
                argument: {
                    type: 'Identifier',
                    name: 'error',
                    range: [8, 12],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [2, 35],
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 2, column: 10 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'error',
                    range: [36, 40],
                    loc: {
                        start: { line: 2, column: 10 },
                        end: { line: 2, column: 15 }
                    }
                },
                range: [36, 41],
                loc: {
                    start: { line: 2, column: 10 },
                    end: { line: 2, column: 16 }
                }
            }],
            range: [0, 43],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 2, column: 18 }
            }
        }

    },

    'Source elements': {

        '': {
            type: 'Program',
            body: [],
            range: [0, -1],
            loc: {
                start: { line: 0, column: 0 },
                end: { line: 0, column: 0 }
            },
            tokens: []
        }
    },

    'Trace Function Entrance': {

        'function hello() {}': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'EnterFunction'
            },
            result: 'function hello() {\nEnterFunction({ name: \'hello\', lineNumber: 1, range: [0, 18] });}'
        },

        'hello = function() {}': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'Enter'
            },
            result: 'hello = function() {\nEnter({ name: \'hello\', lineNumber: 1, range: [8, 20] });}'
        },

        'hi = function() {}': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'customTracer'
            },
            result: 'hi = function() {\n// function "hi" at line 1\n}'
        },

        'var hello = function() {}': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'TRACE'
            },
            result: 'var hello = function() {\nTRACE({ name: \'hello\', lineNumber: 1, range: [12, 24] });}'
        },

        'var hello = function say() {}': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'TRACE'
            },
            result: 'var hello = function say() {\nTRACE({ name: \'hello\', lineNumber: 1, range: [12, 28] });}'
        },

        'hello = function () {}': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'EnterFunction'
            },
            result: 'hello = function () {\nEnterFunction({ name: \'hello\', lineNumber: 1, range: [8, 21] });}'
        },

        '\n\nfunction say(name) { print(name);}': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'EnterFunction'
            },
            result: '\n\nfunction say(name) {\nEnterFunction({ name: \'say\', lineNumber: 3, range: [2, 35] }); print(name);}'
        },

        '(function(){}())': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'EnterFunction'
            },
            result: '(function(){\nEnterFunction({ name: \'[Anonymous]\', lineNumber: 1, range: [1, 12] });}())'
        },

        '(function(){})()': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'EnterFunction'
            },
            result: '(function(){\nEnterFunction({ name: \'[Anonymous]\', lineNumber: 1, range: [0, 13] });})()'
        },

        '[14, 3].forEach(function(x) { alert(x) })': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'TR'
            },
            result: '[14, 3].forEach(function(x) {\nTR({ name: \'[Anonymous]\', lineNumber: 1, range: [16, 39] }); alert(x) })'
        },

        'var x = { y: function(z) {} }': {
            modifiers: {
                name: 'Tracer.FunctionEntrance',
                config: 'TR'
            },
            result: 'var x = { y: function(z) {\nTR({ name: \'y\', lineNumber: 1, range: [13, 26] });} }'
        },

        'p = function() {\n}': {
            modifiers: [{
                name: 'Tracer.FunctionEntrance',
                config: 'X'
            }, {
                name: 'Tracer.FunctionEntrance',
                config: 'Y'
            }],
            result: 'p = function() {\n' +
                'Y({ name: \'p\', lineNumber: 1, range: [4, 66] });\n' +
                'X({ name: \'p\', lineNumber: 1, range: [4, 17] });\n}'
        }

    },

    'Generate Expression': {
        'this': {
            from: {
                type: 'ThisExpression'
            }
        },

        '42': {
            from: {
                type: 'Literal',
                value: 42
            }
        },

        '(1 + 2) * 3': {
            from: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Literal',
                        value: 1
                    },
                    right: {
                        type: 'Literal',
                        value: 2
                    }
                },
                right: {
                    type: 'Literal',
                    value: 3
                }
            }
        },

        'x = []': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ArrayExpression',
                    elements: []
                }
            }
        },

        'x = [\n    42\n]': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 42
                    }]
                }
            }
        },

        'x = [\n    ,\n    ,\n    42\n]': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0]
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [
                        null,
                        null,
                        {
                            type: 'Literal',
                            value: 42
                        }]
                }
            }
        },

        'x = [\n    1,\n    2,\n    3\n]': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 1
                    }, {
                        type: 'Literal',
                        value: 2
                    }, {
                        type: 'Literal',
                        value: 3
                    }]
                }
            }
        },

        'x = [\n    1,\n    2,\n    ,\n    3\n]': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 1
                    }, {
                        type: 'Literal',
                        value: 2
                    }, null, {
                        type: 'Literal',
                        value: 3
                    }]
                }
            }
        },

        'x = [\n    ,\n]': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [ null ]
                }
            }
        },

        'x = [\n    20,\n    ,\n]': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 20
                    }, null ]
                }
            }
        },

        '日本語 = []': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: '日本語'
                },
                right: {
                    type: 'ArrayExpression',
                    elements: []
                }
            }
        },

        'T\u203F = []': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'T\u203F'
                },
                right: {
                    type: 'ArrayExpression',
                    elements: []
                }
            }
        },

        'x = {}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: []
                }
            }
        },

        'x = {\n    answer: 42\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'answer'
                        },
                        value: {
                            type: 'Literal',
                            value: 42
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'x = {\n    if: 42\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'if'
                        },
                        value: {
                            type: 'Literal',
                            value: 42
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'x = {\n    true: 42\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'true'
                        },
                        value: {
                            type: 'Literal',
                            value: 42
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'x = {\n    false: 42\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'false'
                        },
                        value: {
                            type: 'Literal',
                            value: 42
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'x = {\n    null: 42\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'null'
                        },
                        value: {
                            type: 'Literal',
                            value: 42
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'x = {\n    \'answer\': 42\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'answer'
                        },
                        value: {
                            type: 'Literal',
                            value: 42
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'x = {\n    get width() {\n        return m_width;\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 0]
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'width'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'm_width'
                                    }
                                }]
                            }
                        },
                        kind: 'get'
                    }]
                }
            }
        },

        'x = {\n    get undef() {\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'undef'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        },
                        kind: 'get'
                    }]
                }
            }
        },

        'x = {\n    get if() {\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'if'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        },
                        kind: 'get'
                    }]
                }
            }
        },

        'x = {\n    get true() {\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'true'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        },
                        kind: 'get'
                    }]
                }
            }
        },

        'x = {\n    get false() {\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'false'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        },
                        kind: 'get'
                    }]
                }
            }
        },

        'x = {\n    get null() {\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'null'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        },
                        kind: 'get'
                    }]
                }
            }
        },

        'x = {\n    get "undef"() {\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'undef',
                            raw: '"undef"'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        },
                        kind: 'get'
                    }]
                }
            }
        },

        'x = {\n    get 10() {\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 10,
                            raw: '10'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: []
                            }
                        },
                        kind: 'get'
                    }]
                }
            }
        },

        'x = {\n    set width(w) {\n        m_width = w;\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'width'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w'
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_width'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w'
                                        }
                                    }
                                }]
                            }
                        },
                        kind: 'set'
                    }]
                }
            }
        },

        'x = {\n    set if(w) {\n        m_if = w;\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'if'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w'
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_if'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w'
                                        }
                                    }
                                }]
                            }
                        },
                        kind: 'set'
                    }]
                }
            }
        },

        'x = {\n    set true(w) {\n        m_true = w;\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'true'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w'
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_true'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w'
                                        }
                                    }
                                }]
                            }
                        },
                        kind: 'set'
                    }]
                }
            }
        },

        'x = {\n    set false(w) {\n        m_false = w;\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'false'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w'
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_false'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w'
                                        }
                                    }
                                }]
                            }
                        },
                        kind: 'set'
                    }]
                }
            }
        },

        'x = {\n    set null(w) {\n        m_null = w;\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'null'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w'
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_null'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w'
                                        }
                                    }
                                }]
                            }
                        },
                        kind: 'set'
                    }]
                }
            }
        },

        'x = {\n    set "null"(w) {\n        m_null = w;\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'null',
                            raw: '"null"'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w'
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_null'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w'
                                        }
                                    }
                                }]
                            }
                        },
                        kind: 'set'
                    }]
                }
            }
        },

        'x = {\n    set 10(w) {\n        m_null = w;\n    }\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 10,
                            raw: '10'
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'w'
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'm_null'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'w'
                                        }
                                    }
                                }]
                            }
                        },
                        kind: 'set'
                    }]
                }
            }
        },

        'x = {\n    get: 42\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'get'
                        },
                        value: {
                            type: 'Literal',
                            value: 42
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'x = {\n    set: 43\n}': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'set'
                        },
                        value: {
                            type: 'Literal',
                            value: 43
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        '0': {
            from: {
                type: 'Literal',
                value: 0
            }
        },

        '0.14': {
            from: {
                type: 'Literal',
                value: 0.14
            }
        },

        '\'Hello\'': {
            from: {
                type: 'Literal',
                value: 'Hello'
            }
        },

        '\'\\n\\r\\b\\f\\\\\\\'"\\u0000\'': {
            from: {
                type: 'Literal',
                value: '\n\r\b\f\\\'"\x00'
            }
        },

        '\'0\'': {
            from: {
                type: 'Literal',
                value: '0'
            }
        },

        '\'Hello\\nworld\'': {
            from: {
                type: 'Literal',
                value: 'Hello\nworld'
            }
        },

        '/a/': {
            from: {
                type: 'Literal',
                value: /a/
            }
        },

        'new Button()': {
            from: {
                type: 'NewExpression',
                callee: {
                    type: 'Identifier',
                    name: 'Button'
                },
                'arguments': []
            }
        },

        'new new foo(0)()': {
            from: {
                type: 'NewExpression',
                callee: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo'
                    },
                    'arguments': [{
                        type: 'Literal',
                        value: 0
                    }]
                },
                'arguments': []
            }
        },

        'new new foo()(0)': {
            from: {
                type: 'NewExpression',
                callee: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo'
                    },
                    'arguments': []
                },
                'arguments': [{
                    type: 'Literal',
                    value: 0
                }]
            }
        },

        'new foo().bar()': {
            from: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'foo'
                        },
                        'arguments': []
                    },
                    property: {
                        type: 'Identifier',
                        name: 'bar'
                    }
                },
                'arguments': []
            }
        },

        'new foo.bar()': {
            from: {
                type: 'NewExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'Identifier',
                        name: 'foo'
                    },
                    property: {
                        type: 'Identifier',
                        name: 'bar'
                    }
                },
                'arguments': []
            }
        },

        'foo(bar, baz)': {
            from: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'foo'
                },
                'arguments': [{
                    type: 'Identifier',
                    name: 'bar'
                }, {
                    type: 'Identifier',
                    name: 'baz'
                }]
            }
        },

        'universe.milkyway': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe'
                },
                property: {
                    type: 'Identifier',
                    name: 'milkyway'
                }
            }
        },

        'universe.milkyway.solarsystem': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'Identifier',
                        name: 'universe'
                    },
                    property: {
                        type: 'Identifier',
                        name: 'milkyway'
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'solarsystem'
                }
            }
        },

        'universe.milkyway.solarsystem.Earth': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Identifier',
                            name: 'universe'
                        },
                        property: {
                            type: 'Identifier',
                            name: 'milkyway'
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'solarsystem'
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'Earth'
                }
            }
        },

        'universe[galaxyName, otherUselessName]': {
            from: {
                type: 'MemberExpression',
                computed: true,
                object: {
                    type: 'Identifier',
                    name: 'universe'
                },
                property: {
                    type: 'SequenceExpression',
                    expressions: [{
                        type: 'Identifier',
                        name: 'galaxyName'
                    }, {
                        type: 'Identifier',
                        name: 'otherUselessName'
                    }]
                }
            }
        },

        'universe[galaxyName]': {
            from: {
                type: 'MemberExpression',
                computed: true,
                object: {
                    type: 'Identifier',
                    name: 'universe'
                },
                property: {
                    type: 'Identifier',
                    name: 'galaxyName'
                }
            }
        },

        'universe[42].galaxies': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                        type: 'Identifier',
                        name: 'universe'
                    },
                    property: {
                        type: 'Literal',
                        value: 42
                    }
                },
                property: {
                    type: 'Identifier',
                    name: 'galaxies'
                }
            }
        },

        'universe(42).galaxies': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'universe'
                    },
                    'arguments': [{
                        type: 'Literal',
                        value: 42
                    }]
                },
                property: {
                    type: 'Identifier',
                    name: 'galaxies'
                }
            }
        },

        'universe(42).galaxies(14, 3, 77).milkyway': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'universe'
                            },
                            'arguments': [{
                                type: 'Literal',
                                value: 42
                            }]
                        },
                        property: {
                            type: 'Identifier',
                            name: 'galaxies'
                        }
                    },
                    'arguments': [{
                        type: 'Literal',
                        value: 14
                    }, {
                        type: 'Literal',
                        value: 3
                    }, {
                        type: 'Literal',
                        value: 77
                    }]
                },
                property: {
                    type: 'Identifier',
                    name: 'milkyway'
                }
            }
        },

        'earth.asia.Indonesia.prepareForElection(2014)': {
            from: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'earth'
                            },
                            property: {
                                type: 'Identifier',
                                name: 'asia'
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'Indonesia'
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'prepareForElection'
                    }
                },
                'arguments': [{
                    type: 'Literal',
                    value: 2014
                }]
            }
        },

        'universe.if': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe'
                },
                property: {
                    type: 'Identifier',
                    name: 'if'
                }
            }
        },

        'universe.true': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe'
                },
                property: {
                    type: 'Identifier',
                    name: 'true'
                }
            }
        },

        'universe.false': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe'
                },
                property: {
                    type: 'Identifier',
                    name: 'false'
                }
            }
        },

        'universe.null': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'universe'
                },
                property: {
                    type: 'Identifier',
                    name: 'null'
                }
            }
        },

        '\'string\'.toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: 'string'
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        '42..toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: 42
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        '1e+1000.toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: Infinity
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        '1e+100.toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: 1e100
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        'x++': {
            from: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                },
                prefix: false
            }
        },

        'x--': {
            from: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                },
                prefix: false
            }
        },

        '++x': {
            from: {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                },
                prefix: true
            }
        },

        '--x': {
            from: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                },
                prefix: true
            }
        },

        '+x': {
            from: {
                type: 'UnaryExpression',
                operator: '+',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        '-x': {
            from: {
                type: 'UnaryExpression',
                operator: '-',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        '~x': {
            from: {
                type: 'UnaryExpression',
                operator: '~',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        '!x': {
            from: {
                type: 'UnaryExpression',
                operator: '!',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        'void x': {
            from: {
                type: 'UnaryExpression',
                operator: 'void',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        'delete x': {
            from: {
                type: 'UnaryExpression',
                operator: 'delete',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        'typeof x': {
            from: {
                type: 'UnaryExpression',
                operator: 'typeof',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        'x * y': {
            from: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x / y': {
            from: {
                type: 'BinaryExpression',
                operator: '/',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x % y': {
            from: {
                type: 'BinaryExpression',
                operator: '%',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x + y': {
            from: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x - y': {
            from: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x << y': {
            from: {
                type: 'BinaryExpression',
                operator: '<<',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x >> y': {
            from: {
                type: 'BinaryExpression',
                operator: '>>',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x >>> y': {
            from: {
                type: 'BinaryExpression',
                operator: '>>>',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x < y': {
            from: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x > y': {
            from: {
                type: 'BinaryExpression',
                operator: '>',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x <= y': {
            from: {
                type: 'BinaryExpression',
                operator: '<=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x >= y': {
            from: {
                type: 'BinaryExpression',
                operator: '>=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        '(x in y)': {
            from: {
                type: 'BinaryExpression',
                operator: 'in',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x instanceof y': {
            from: {
                type: 'BinaryExpression',
                operator: 'instanceof',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x == y': {
            from: {
                type: 'BinaryExpression',
                operator: '==',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x != y': {
            from: {
                type: 'BinaryExpression',
                operator: '!=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x === y': {
            from: {
                type: 'BinaryExpression',
                operator: '===',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x !== y': {
            from: {
                type: 'BinaryExpression',
                operator: '!==',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x & y': {
            from: {
                type: 'BinaryExpression',
                operator: '&',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x ^ y': {
            from: {
                type: 'BinaryExpression',
                operator: '^',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x | y': {
            from: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x + y + z': {
            from: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x - y + z': {
            from: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'BinaryExpression',
                    operator: '-',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x + y - z': {
            from: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x - y - z': {
            from: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'BinaryExpression',
                    operator: '-',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x + y * z': {
            from: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'y'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z'
                    }
                }
            }
        },

        'x + y / z': {
            from: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '/',
                    left: {
                        type: 'Identifier',
                        name: 'y'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z'
                    }
                }
            }
        },

        'x - y % z': {
            from: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '%',
                    left: {
                        type: 'Identifier',
                        name: 'y'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z'
                    }
                }
            }
        },

        'x * y * z': {
            from: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x * y / z': {
            from: {
                type: 'BinaryExpression',
                operator: '/',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x * y % z': {
            from: {
                type: 'BinaryExpression',
                operator: '%',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x % y * z': {
            from: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '%',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x << y << z': {
            type: 'ExpressionStatement',
            from: {
                type: 'BinaryExpression',
                operator: '<<',
                left: {
                    type: 'BinaryExpression',
                    operator: '<<',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x | y | z': {
            from: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'BinaryExpression',
                    operator: '|',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x & y & z': {
            from: {
                type: 'BinaryExpression',
                operator: '&',
                left: {
                    type: 'BinaryExpression',
                    operator: '&',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x ^ y ^ z': {
            from: {
                type: 'BinaryExpression',
                operator: '^',
                left: {
                    type: 'BinaryExpression',
                    operator: '^',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x & y | z': {
            from: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'BinaryExpression',
                    operator: '&',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x | y ^ z': {
            from: {
                type: 'BinaryExpression',
                operator: '^',
                left: {
                    type: 'BinaryExpression',
                    operator: '|',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x | y & z': {
            from: {
                type: 'BinaryExpression',
                operator: '|',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '&',
                    left: {
                        type: 'Identifier',
                        name: 'y'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z'
                    }
                }
            }
        },

        'x || y': {
            from: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x && y': {
            from: {
                type: 'LogicalExpression',
                operator: '&&',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'y'
                }
            }
        },

        'x || y || z': {
            from: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'LogicalExpression',
                    operator: '||',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x && y && z': {
            from: {
                type: 'LogicalExpression',
                operator: '&&',
                left: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'z'
                }
            }
        },

        'x || y && z': {
            from: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'y'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z'
                    }
                }
            }
        },

        'x || y ^ z': {
            from: {
                type: 'LogicalExpression',
                operator: '||',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '^',
                    left: {
                        type: 'Identifier',
                        name: 'y'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'z'
                    }
                }
            }
        },

        'y ? 1 : 2': {
            from: {
                type: 'ConditionalExpression',
                test: {
                    type: 'Identifier',
                    name: 'y'
                },
                consequent: {
                    type: 'Literal',
                    value: 1
                },
                alternate: {
                    type: 'Literal',
                    value: 2
                }
            }
        },

        'x && y ? 1 : 2': {
            from: {
                type: 'ConditionalExpression',
                test: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                },
                consequent: {
                    type: 'Literal',
                    value: 1
                },
                alternate: {
                    type: 'Literal',
                    value: 2
                }
            }
        },

        'x = 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x *= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '*=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x /= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '/=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x %= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '%=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x += 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '+=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x -= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '-=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x <<= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '<<=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x >>= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '>>=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x >>>= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '>>>=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x &= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '&=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x ^= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '^=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        'x |= 42': {
            from: {
                type: 'AssignmentExpression',
                operator: '|=',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Literal',
                    value: 42
                }
            }
        },

        '0x20.toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: 0x20,
                    raw: '0x20'
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        '0..toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: 0,
                    raw: '0.'
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        '1e2.toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: 100,
                    raw: '1e2'
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        '"TEST"': {
            from: {
                type: 'Literal',
                value: 'TEST',
                raw: '"TEST"'
            }
        },

        '1..toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: 1,
                    raw: '20'
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        '2..toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: 2,
                    raw: '"TEST"'
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        '3..toString': {
            from: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Literal',
                    value: 3,
                    raw: null
                },
                property: {
                    type: 'Identifier',
                    name: 'toString'
                }
            }
        },

        '-(-1);': {
            from: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '-',
                    argument: {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                            type: 'Literal',
                            value: 1
                        }
                    }
                }
            }
        },

        '+-+-1;': {
            from: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '+',
                    argument: {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                            type: 'UnaryExpression',
                            operator: '+',
                            argument: {
                                type: 'UnaryExpression',
                                operator: '-',
                                argument: {
                                    type: 'Literal',
                                    value: 1
                                }
                            }
                        }
                    }
                }
            }
        },

        '1 + +(+1);': {
            from: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Literal',
                        value: 1
                    },
                    right: {
                        type: 'UnaryExpression',
                        operator: '+',
                        argument: {
                            type: 'UnaryExpression',
                            operator: '+',
                            argument: {
                                type: 'Literal',
                                value: 1
                            }
                        }
                    }
                }
            }
        },

        'typeof typeof -1;': {
            from: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: 'typeof',
                    argument: {
                        type: 'UnaryExpression',
                        operator: 'typeof',
                        argument: {
                            type: 'UnaryExpression',
                            operator: '-',
                            argument: {
                                type: 'Literal',
                                value: 1
                            }
                        }
                    }
                }
            }
        }

    },

    'Generate Statement': {

        '{\n    foo;\n}': {
            from: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'foo'
                    }
                }]
            }
        },

        '{\n    doThis();\n    doThat();\n}': {
            from: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'doThis'
                        },
                        'arguments': []
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'doThat'
                        },
                        'arguments': []
                    }
                }]
            }
        },

        '{\n}': {
            from: {
                type: 'BlockStatement',
                body: []
            }
        },

        'var x;': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    init: null
                }],
                kind: 'var'
            }
        },

        'var x, y;': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    init: null
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y'
                    },
                    init: null
                }],
                kind: 'var'
            }
        },

        'var x = 42;': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42'
                    }
                }],
                kind: 'var'
            }
        },

        'var x = (42, 43);': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    init: {
                        type: 'SequenceExpression',
                        expressions: [{
                            type: 'Literal',
                            value: 42
                        }, {
                            type: 'Literal',
                            value: 43
                        }]
                    }
                }],
                kind: 'var'
            }
        },

        'var x = 14, y = 3, z = 1977;': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    init: {
                        type: 'Literal',
                        value: 14,
                        raw: '14'
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'y'
                    },
                    init: {
                        type: 'Literal',
                        value: 3,
                        raw: '3'
                    }
                }, {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'z'
                    },
                    init: {
                        type: 'Literal',
                        value: 1977,
                        raw: '1977'
                    }
                }],
                kind: 'var'
            }
        },

        'var x = function () {\n};': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    init: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: []
                        }
                    }
                }],
                kind: 'var'
            }
        },

        'let x;': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    init: null
                }],
                kind: 'let'
            }
        },

        '{\n    let x;\n}': {
            from: {
                type: 'BlockStatement',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: null
                    }],
                    kind: 'let'
                }]
            }
        },

        '{\n    let x = 42;\n}': {
            from: {
                type: 'BlockStatement',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 42,
                            raw: '42'
                        }
                    }],
                    kind: 'let'
                }]
            }
        },

        '{\n    let x = 14, y = 3, z = 1977;\n}': {
            from: {
                type: 'BlockStatement',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 14,
                            raw: '14'
                        }
                    }, {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'y'
                        },
                        init: {
                            type: 'Literal',
                            value: 3,
                            raw: '3'
                        }
                    }, {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'z'
                        },
                        init: {
                            type: 'Literal',
                            value: 1977,
                            raw: '1977'
                        }
                    }],
                    kind: 'let'
                }]
            }
        },

        'const x = 42;': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42'
                    }
                }],
                kind: 'const'
            }
        },

        '{\n    const x = 42;\n}': {
            from: {
                type: 'BlockStatement',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 42,
                            raw: '42'
                        }
                    }],
                    kind: 'const'
                }]
            }
        },

        '{\n    const x = 14, y = 3, z = 1977;\n}': {
            from: {
                type: 'BlockStatement',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 14,
                            raw: '14'
                        }
                    }, {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'y'
                        },
                        init: {
                            type: 'Literal',
                            value: 3,
                            raw: '3'
                        }
                    }, {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'z'
                        },
                        init: {
                            type: 'Literal',
                            value: 1977,
                            raw: '1977'
                        }
                    }],
                    kind: 'const'
                }]
            }
        },

        ';': {
            from: {
                type: 'EmptyStatement'
            }
        },

        'x;': {
            from: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        'x, y;': {
            from: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'SequenceExpression',
                    expressions: [{
                        type: 'Identifier',
                        name: 'x'
                    }, {
                        type: 'Identifier',
                        name: 'y'
                    }]
                }
            }
        },

        'a;': {
            from: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'a'
                }
            }
        },

        'aa;': {
            from: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'aa'
                }
            }
        },

        'if (morning)\n    goodMorning();': {
            from: {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning'
                },
                consequent: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'goodMorning'
                        },
                        'arguments': []
                    }
                },
                alternate: null
            }
        },

        'if ({\n        morning: true\n    })\n    goodMorning();': {
            from: {
                type: 'IfStatement',
                test: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'morning'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                },
                consequent: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'goodMorning'
                        },
                        'arguments': []
                    }
                },
                alternate: null
            }
        },

        'if (morning)\n    (function () {\n    });': {
            from: {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning'
                },
                consequent: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: []
                        }
                    }
                },
                alternate: null
            }
        },

        'if (morning)\n    var x = 0;': {
            from: {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning'
                },
                consequent: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 0,
                            raw: '0'
                        }
                    }],
                    kind: 'var'
                },
                alternate: null
            }
        },

        'if (morning) {\n    var x = 0;\n}': {
            from: {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning'
                },
                consequent: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            init: {
                                type: 'Literal',
                                value: 0,
                                raw: '0'
                            }
                        }],
                        kind: 'var'
                    }]
                },
                alternate: null
            }
        },

        'if (morning)\n    goodMorning();\nelse\n    goodDay();': {
            from: {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning'
                },
                consequent: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'goodMorning'
                        },
                        'arguments': []
                    }
                },
                alternate: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'goodDay'
                        },
                        'arguments': []
                    }
                }
            }
        },

        'if (morning) {\n    goodMorning();\n} else {\n    goodDay();\n}': {
            from: {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning'
                },
                consequent: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'goodMorning'
                            },
                            'arguments': []
                        }
                    }]
                },
                alternate: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'goodDay'
                            },
                            'arguments': []
                        }
                    }]
                }
            }
        },

        'if (morning) {\n    goodMorning();\n} else if (afternoon) {\n    goodDay();\n} else {\n    goodEvening();\n}': {
            from: {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning'
                },
                consequent: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'goodMorning'
                            },
                            'arguments': []
                        }
                    }]
                },
                alternate: {
                    type: 'IfStatement',
                    test: {
                        type: 'Identifier',
                        name: 'afternoon'
                    },
                    consequent: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'goodDay'
                                },
                                'arguments': []
                            }
                        }]
                    },
                    alternate: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'goodEvening'
                                },
                                'arguments': []
                            }
                        }]
                    }
                }
            }
        },

        'if (morning)\n    if (afternoon)\n        goodDay();\n    else\n        goodEvening();': {
            from: {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning'
                },
                consequent: {
                    type: 'IfStatement',
                    test: {
                        type: 'Identifier',
                        name: 'afternoon'
                    },
                    consequent: {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'goodDay'
                            },
                            'arguments': []
                        }
                    },
                    alternate: {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'goodEvening'
                            },
                            'arguments': []
                        }
                    }
                },
                alternate: null
            }
        },

        'do\n    keep();\nwhile (true);': {
            from: {
                type: 'DoWhileStatement',
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'keep'
                        },
                        'arguments': []
                    }
                },
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true'
                }
            }
        },


        'do\n    keep();\nwhile ({\n    morning: true\n});': {
            from: {
                type: 'DoWhileStatement',
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'keep'
                        },
                        'arguments': []
                    }
                },
                test: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'morning'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'do {\n    x++;\n    y--;\n} while (x < 10);': {
            from: {
                type: 'DoWhileStatement',
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'UpdateExpression',
                            operator: '++',
                            argument: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            prefix: false
                        }
                    }, {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'UpdateExpression',
                            operator: '--',
                            argument: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            prefix: false
                        }
                    }]
                },
                test: {
                    type: 'BinaryExpression',
                    operator: '<',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Literal',
                        value: 10,
                        raw: '10'
                    }
                }
            }
        },

        '{\n    do {\n    } while (false);\n    false;\n}': {
            from: {
                type: 'BlockStatement',
                body: [{
                    type: 'DoWhileStatement',
                    body: {
                        type: 'BlockStatement',
                        body: []
                    },
                    test: {
                        type: 'Literal',
                        value: false,
                        raw: 'false'
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: false,
                        raw: 'false'
                    }
                }]
            }
        },

        'while (true)\n    doSomething();': {
            from: {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    value: true,
                    raw: 'true'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'doSomething'
                        },
                        'arguments': []
                    }
                }
            }
        },


        'while ({\n        morning: true\n    })\n    doSomething();': {
            from: {
                type: 'WhileStatement',
                test: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'morning'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'doSomething'
                        },
                        'arguments': []
                    }
                }
            }
        },

        'while (x < 10) {\n    x++;\n    y--;\n}': {
            from: {
                type: 'WhileStatement',
                test: {
                    type: 'BinaryExpression',
                    operator: '<',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Literal',
                        value: 10,
                        raw: '10'
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'UpdateExpression',
                            operator: '++',
                            argument: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            prefix: false
                        }
                    }, {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'UpdateExpression',
                            operator: '--',
                            argument: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            prefix: false
                        }
                    }]
                }
            }
        },

        'for (;;);': {
            from: {
                type: 'ForStatement',
                init: null,
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement'
                }
            }
        },

        'for (;;) {\n}': {
            from: {
                type: 'ForStatement',
                init: null,
                test: null,
                update: null,
                body: {
                    type: 'BlockStatement',
                    body: []
                }
            }
        },

        'for (x = 0;;);': {
            from: {
                type: 'ForStatement',
                init: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Literal',
                        value: 0,
                        raw: '0'
                    }
                },
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement'
                }
            }
        },


        'for (x = {\n        morning: true\n    }; {\n        afternoon: true\n    }; {\n        evening: true\n    });': {
            from: {
                type: 'ForStatement',
                init: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'morning'
                            },
                            value: {
                                type: 'Literal',
                                value: true
                            },
                            kind: 'init'
                        }]
                    }
                },
                test: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'afternoon'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                },
                update: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'evening'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                },
                body: {
                    type: 'EmptyStatement'
                }
            }
        },

        'for (var x = 0;;);': {
            from: {
                type: 'ForStatement',
                init: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 0,
                            raw: '0'
                        }
                    }],
                    kind: 'var'
                },
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement'
                }
            }
        },

        'for (var x = {\n            morning: true\n        };;);': {
            from: {
                type: 'ForStatement',
                init: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'ObjectExpression',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'morning'
                                },
                                value: {
                                    type: 'Literal',
                                    value: true
                                },
                                kind: 'init'
                            }]
                        }
                    }],
                    kind: 'var'
                },
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement'
                }
            }
        },

        'for (let x = 0;;);': {
            from: {
                type: 'ForStatement',
                init: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 0,
                            raw: '0'
                        }
                    }],
                    kind: 'let'
                },
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement'
                }
            }
        },

        'for (var x = 0, y = 1;;);': {
            from: {
                type: 'ForStatement',
                init: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 0,
                            raw: '0'
                        }
                    }, {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'y'
                        },
                        init: {
                            type: 'Literal',
                            value: 1,
                            raw: '1'
                        }
                    }],
                    kind: 'var'
                },
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement'
                }
            }
        },

        'for (x = 0; x < 42;);': {
            from: {
                type: 'ForStatement',
                init: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Literal',
                        value: 0,
                        raw: '0'
                    }
                },
                test: {
                    type: 'BinaryExpression',
                    operator: '<',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Literal',
                        value: 42,
                        raw: '42'
                    }
                },
                update: null,
                body: {
                    type: 'EmptyStatement'
                }
            }
        },

        'for (x = 0; x < 42; x++);': {
            from: {
                type: 'ForStatement',
                init: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Literal',
                        value: 0,
                        raw: '0'
                    }
                },
                test: {
                    type: 'BinaryExpression',
                    operator: '<',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Literal',
                        value: 42,
                        raw: '42'
                    }
                },
                update: {
                    type: 'UpdateExpression',
                    operator: '++',
                    argument: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    prefix: false
                },
                body: {
                    type: 'EmptyStatement'
                }
            }
        },

        'for (x = 0; x < 42; x++)\n    process(x);': {
            from: {
                type: 'ForStatement',
                init: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Literal',
                        value: 0,
                        raw: '0'
                    }
                },
                test: {
                    type: 'BinaryExpression',
                    operator: '<',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Literal',
                        value: 42,
                        raw: '42'
                    }
                },
                update: {
                    type: 'UpdateExpression',
                    operator: '++',
                    argument: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    prefix: false
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                }
            }
        },

        'for (x in list)\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'Identifier',
                    name: 'list'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (x in {\n        morning: true\n    })\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'Identifier',
                    name: 'x'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'morning'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (var x in list)\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: null
                    }],
                    kind: 'var'
                },
                right: {
                    type: 'Identifier',
                    name: 'list'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (var x in {\n        morning: true\n    })\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: null
                    }],
                    kind: 'var'
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'morning'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (var x = 42 in list)\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 42,
                            raw: '42'
                        }
                    }],
                    kind: 'var'
                },
                right: {
                    type: 'Identifier',
                    name: 'list'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (var x = {\n            morning: true\n        } in list)\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'ObjectExpression',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'morning'
                                },
                                value: {
                                    type: 'Literal',
                                    value: true
                                },
                                kind: 'init'
                            }]
                        }
                    }],
                    kind: 'var'
                },
                right: {
                    type: 'Identifier',
                    name: 'list'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (let x in list)\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: null
                    }],
                    kind: 'let'
                },
                right: {
                    type: 'Identifier',
                    name: 'list'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (let x = 42 in list)\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 42,
                            raw: '42'
                        }
                    }],
                    kind: 'let'
                },
                right: {
                    type: 'Identifier',
                    name: 'list'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (var i = function () {\n            return (10 in []);\n        } in list)\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'i'
                        },
                        init: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: 'in',
                                        left: {
                                            type: 'Literal',
                                            value: 10,
                                            raw: '10'
                                        },
                                        right: {
                                            type: 'ArrayExpression',
                                            elements: []
                                        }
                                    }
                                }]
                            }
                        }
                    }],
                    kind: 'var'
                },
                right: {
                    type: 'Identifier',
                    name: 'list'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (var x = (42 in arr) in list)\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'BinaryExpression',
                            operator: 'in',
                            left: {
                                type: 'Literal',
                                value: 42,
                                raw: '42'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'arr'
                            }
                        }
                    }],
                    kind: 'var'
                },
                right: {
                    type: 'Identifier',
                    name: 'list'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'for (var x = 42 in (arr in list))\n    process(x);': {
            from: {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
                            value: 42,
                            raw: '42'
                        }
                    }],
                    kind: 'var'
                },
                right: {
                    type: 'BinaryExpression',
                    operator: 'in',
                    left: {
                        type: 'Identifier',
                        name: 'arr'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'list'
                    }
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process'
                        },
                        'arguments': [{
                            type: 'Identifier',
                            name: 'x'
                        }]
                    }
                },
                each: false
            }
        },

        'continue;': {
            from: {
                type: 'ContinueStatement',
                label: null
            }
        },

        'continue done;': {
            from: {
                type: 'ContinueStatement',
                label: {
                    type: 'Identifier',
                    name: 'done'
                }
            }
        },

        'break;': {
            from: {
                type: 'BreakStatement',
                label: null
            }
        },

        'break done;': {
            from: {
                type: 'BreakStatement',
                label: {
                    type: 'Identifier',
                    name: 'done'
                }
            }
        },

        'return;': {
            from: {
                type: 'ReturnStatement',
                argument: null
            }
        },

        'return x;': {
            from: {
                type: 'ReturnStatement',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        'return x * y;': {
            from: {
                type: 'ReturnStatement',
                argument: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                }
            }
        },

        'return {\n    morning: true\n};': {
            from: {
                type: 'ReturnStatement',
                argument: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'morning'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'with (x)\n    foo = bar;': {
            from: {
                type: 'WithStatement',
                object: {
                    type: 'Identifier',
                    name: 'x'
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            name: 'foo'
                        },
                        right: {
                            type: 'Identifier',
                            name: 'bar'
                        }
                    }
                }
            }
        },

        'with ({\n        morning: true\n    })\n    foo = bar;': {
            from: {
                type: 'WithStatement',
                object: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'morning'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            name: 'foo'
                        },
                        right: {
                            type: 'Identifier',
                            name: 'bar'
                        }
                    }
                }
            }
        },

        'with (x) {\n    foo = bar;\n}': {
            from: {
                type: 'WithStatement',
                object: {
                    type: 'Identifier',
                    name: 'x'
                },
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            operator: '=',
                            left: {
                                type: 'Identifier',
                                name: 'foo'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'bar'
                            }
                        }
                    }]
                }
            }
        },

        'switch (x) {\n}': {
            from: {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        'switch ({\n        morning: true\n    }) {\n}': {
            from: {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'morning'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'switch (answer) {\ncase 42:\n    hi();\n    break;\n}': {
            from: {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer'
                },
                cases: [{
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 42,
                        raw: '42'
                    },
                    consequent: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'hi'
                            },
                            'arguments': []
                        }
                    }, {
                        type: 'BreakStatement',
                        label: null
                    }]
                }]
            }
        },

        'switch (answer) {\ncase {\n        morning: true\n    }:\n    hi();\n    break;\n}': {
            from: {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer'
                },
                cases: [{
                    type: 'SwitchCase',
                    test: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'morning'
                            },
                            value: {
                                type: 'Literal',
                                value: true
                            },
                            kind: 'init'
                        }]
                    },
                    consequent: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'hi'
                            },
                            'arguments': []
                        }
                    }, {
                        type: 'BreakStatement',
                        label: null
                    }]
                }]
            }
        },

        'switch (answer) {\ncase 42: {\n        hi();\n        break;\n    }\n}': {
            from: {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer'
                },
                cases: [{
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 42,
                        raw: '42'
                    },
                    consequent: [{
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'hi'
                                },
                                'arguments': []
                            }
                        }, {
                            type: 'BreakStatement',
                            label: null
                        }]
                    }]
                }]
            }
        },

        'switch (answer) {\ncase 42:\n    hi();\n    break;\ndefault:\n    break;\n}': {
            from: {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer'
                },
                cases: [{
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 42,
                        raw: '42'
                    },
                    consequent: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'hi'
                            },
                            'arguments': []
                        }
                    }, {
                        type: 'BreakStatement',
                        label: null
                    }]
                }, {
                    type: 'SwitchCase',
                    test: null,
                    consequent: [{
                        type: 'BreakStatement',
                        label: null
                    }]
                }]
            }
        },

        'start:\n    for (;;)\n        break start;': {
            from: {
                type: 'LabeledStatement',
                label: {
                    type: 'Identifier',
                    name: 'start'
                },
                body: {
                    type: 'ForStatement',
                    init: null,
                    test: null,
                    update: null,
                    body: {
                        type: 'BreakStatement',
                        label: {
                            type: 'Identifier',
                            name: 'start'
                        }
                    }
                }
            }
        },

        'start:\n    while (true)\n        break start;': {
            from: {
                type: 'LabeledStatement',
                label: {
                    type: 'Identifier',
                    name: 'start'
                },
                body: {
                    type: 'WhileStatement',
                    test: {
                        type: 'Literal',
                        value: true,
                        raw: 'true'
                    },
                    body: {
                        type: 'BreakStatement',
                        label: {
                            type: 'Identifier',
                            name: 'start'
                        }
                    }
                }
            }
        },

        'throw x;': {
            from: {
                type: 'ThrowStatement',
                argument: {
                    type: 'Identifier',
                    name: 'x'
                }
            }
        },

        'throw x * y;': {
            from: {
                type: 'ThrowStatement',
                argument: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'y'
                    }
                }
            }
        },

        'throw {\n    morning: true\n};': {
            from: {
                type: 'ThrowStatement',
                argument: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'morning'
                        },
                        value: {
                            type: 'Literal',
                            value: true
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'throw {\n    message: "Error"\n};': {
            from: {
                type: 'ThrowStatement',
                argument: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'message'
                        },
                        value: {
                            type: 'Literal',
                            value: 'Error',
                            raw: '"Error"'
                        },
                        kind: 'init'
                    }]
                }
            }
        },

        'try {\n} catch (e) {\n}': {
            from: {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: []
                },
                handlers: [{
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'e'
                    },
                    guard: null,
                    body: {
                        type: 'BlockStatement',
                        body: []
                    }
                }],
                finalizer: null
            }
        },

        'try {\n} catch (e) {\n    say(e);\n}': {
            from: {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: []
                },
                handlers: [{
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'e'
                    },
                    guard: null,
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'say'
                                },
                                'arguments': [{
                                    type: 'Identifier',
                                    name: 'e'
                                }]
                            }
                        }]
                    }
                }],
                finalizer: null
            }
        },

        'try {\n} finally {\n    cleanup(stuff);\n}': {
            from: {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: []
                },
                handlers: [],
                finalizer: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'cleanup'
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'stuff'
                            }]
                        }
                    }]
                }
            }
        },

        'try {\n    doThat();\n} catch (e) {\n    say(e);\n}': {
            from: {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'doThat'
                            },
                            'arguments': []
                        }
                    }]
                },
                handlers: [{
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'e'
                    },
                    guard: null,
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'say'
                                },
                                'arguments': [{
                                    type: 'Identifier',
                                    name: 'e'
                                }]
                            }
                        }]
                    }
                }],
                finalizer: null
            }
        },

        'try {\n    doThat();\n} catch (e) {\n    say(e);\n} finally {\n    cleanup(stuff);\n}': {
            from: {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'doThat'
                            },
                            'arguments': []
                        }
                    }]
                },
                handlers: [{
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'e'
                    },
                    guard: null,
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'say'
                                },
                                'arguments': [{
                                    type: 'Identifier',
                                    name: 'e'
                                }]
                            }
                        }]
                    }
                }],
                finalizer: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'cleanup'
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'stuff'
                            }]
                        }
                    }]
                }
            }
        },

        'debugger;': {
            from: {
                type: 'DebuggerStatement'
            }
        },

        'function hello() {\n    sayHi();\n}': {
            from: {
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'hello'
                },
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'sayHi'
                            },
                            'arguments': []
                        }
                    }]
                }
            }
        },

        'function hello(a) {\n    sayHi();\n}': {
            from: {
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'hello'
                },
                params: [{
                    type: 'Identifier',
                    name: 'a'
                }],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'sayHi'
                            },
                            'arguments': []
                        }
                    }]
                }
            }
        },

        'function hello(a, b) {\n    sayHi();\n}': {
            from: {
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'hello'
                },
                params: [{
                    type: 'Identifier',
                    name: 'a'
                }, {
                    type: 'Identifier',
                    name: 'b'
                }],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'sayHi'
                            },
                            'arguments': []
                        }
                    }]
                }
            }
        },

        'var hi = function () {\n    sayHi();\n};': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'hi'
                    },
                    init: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'sayHi'
                                    },
                                    'arguments': []
                                }
                            }]
                        }
                    }
                }],
                kind: 'var'
            }
        },

        'var hello = function hi() {\n    sayHi();\n};': {
            from: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'hello'
                    },
                    init: {
                        type: 'FunctionExpression',
                        id: {
                            type: 'Identifier',
                            name: 'hi'
                        },
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'sayHi'
                                    },
                                    'arguments': []
                                }
                            }]
                        }
                    }
                }],
                kind: 'var'
            }
        },

        '(function () {\n});': {
            from: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: []
                    }
                }
            }
        },

        '': {
            from: {
                type: 'Program',
                body: []
            }
        }

    },

    'Invalid syntax': {

        '{': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Unexpected end of input'
        },

        '}': {
            index: 0,
            lineNumber: 1,
            column: 1,
            message: 'Error: Line 1: Unexpected token }'
        },

        '3ea': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '3in []': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '3e': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '3e+': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '3e-': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '3x': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '3x0': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0x': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '09': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '018': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '01a': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '3in[]': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0x3in[]': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '"Hello\nWorld"': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        'x\\': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        'x\\u005c': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        'x\\u002a': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        'var x = /(s/g': {
            index: 13,
            lineNumber: 1,
            column: 14,
            message: 'Error: Line 1: Invalid regular expression'
        },

        '/': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Invalid regular expression: missing /'
        },

        '[': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Unexpected end of input'
        },

        '[,': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected end of input'
        },

        '1 + {': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Unexpected end of input'
        },

        '1 + { t:t ': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Unexpected end of input'
        },

        '1 + { t:t,': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Unexpected end of input'
        },

        'var x = /\n/': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Invalid regular expression: missing /'
        },

        'var x = "\n': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        'var if = 42': {
            index: 4,
            lineNumber: 1,
            column: 5,
            message: 'Error: Line 1: Unexpected token if'
        },

        'i + 2 = 42': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Invalid left-hand side in assignment'
        },

        '+i = 42': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Invalid left-hand side in assignment'
        },

        '1 + (': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Unexpected end of input'
        },

        '\n\n\n{': {
            index: 4,
            lineNumber: 4,
            column: 2,
            message: 'Error: Line 4: Unexpected end of input'
        },

        '\n/* Some multiline\ncomment */\n)': {
            index: 30,
            lineNumber: 4,
            column: 1,
            message: 'Error: Line 4: Unexpected token )'
        },

        '{ set 1 }': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected number'
        },

        '{ get 2 }': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected number'
        },

        '({ set: s(if) { } })': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Unexpected token if'
        },

        '({ set s(.) { } })': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token .'
        },

        '({ set: s() { } })': {
            index: 12,
            lineNumber: 1,
            column: 13,
            message: 'Error: Line 1: Unexpected token {'
        },

        '({ set: s(a, b) { } })': {
            index: 16,
            lineNumber: 1,
            column: 17,
            message: 'Error: Line 1: Unexpected token {'
        },

        '({ get: g(d) { } })': {
            index: 13,
            lineNumber: 1,
            column: 14,
            message: 'Error: Line 1: Unexpected token {'
        },

        '({ get i() { }, i: 42 })': {
            index: 21,
            lineNumber: 1,
            column: 22,
            message: 'Error: Line 1: Object literal may not have data and accessor property with the same name'
        },

        '({ i: 42, get i() { } })': {
            index: 21,
            lineNumber: 1,
            column: 22,
            message: 'Error: Line 1: Object literal may not have data and accessor property with the same name'
        },

        '({ set i(x) { }, i: 42 })': {
            index: 22,
            lineNumber: 1,
            column: 23,
            message: 'Error: Line 1: Object literal may not have data and accessor property with the same name'
        },

        '({ i: 42, set i(x) { } })': {
            index: 22,
            lineNumber: 1,
            column: 23,
            message: 'Error: Line 1: Object literal may not have data and accessor property with the same name'
        },

        '({ get i() { }, get i() { } })': {
            index: 27,
            lineNumber: 1,
            column: 28,
            message: 'Error: Line 1: Object literal may not have multiple get/set accessors with the same name'
        },

        '({ set i(x) { }, set i(x) { } })': {
            index: 29,
            lineNumber: 1,
            column: 30,
            message: 'Error: Line 1: Object literal may not have multiple get/set accessors with the same name'
        },

        'function t(if) { }': {
            index: 11,
            lineNumber: 1,
            column: 12,
            message: 'Error: Line 1: Unexpected token if'
        },

        'function t(true) { }': {
            index: 11,
            lineNumber: 1,
            column: 12,
            message: 'Error: Line 1: Unexpected token true'
        },

        'function t(false) { }': {
            index: 11,
            lineNumber: 1,
            column: 12,
            message: 'Error: Line 1: Unexpected token false'
        },

        'function t(null) { }': {
            index: 11,
            lineNumber: 1,
            column: 12,
            message: 'Error: Line 1: Unexpected token null'
        },

        'function null() { }': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token null'
        },

        'function true() { }': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token true'
        },

        'function false() { }': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token false'
        },

        'function if() { }': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token if'
        },

        'a b;': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected identifier'
        },

        'if.a;': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token .'
        },

        'a if;': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token if'
        },

        'a class;': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected reserved word'
        },

        'break\n': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Illegal break statement'
        },

        'break 1;': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected number'
        },

        'continue\n': {
            index: 8,
            lineNumber: 1,
            column: 9,
            message: 'Error: Line 1: Illegal continue statement'
        },

        'continue 2;': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected number'
        },

        'throw': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Unexpected end of input'
        },

        'throw;': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Unexpected token ;'
        },

        'throw\n': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Illegal newline after throw'
        },

        'for (var i, i2 in {});': {
            index: 15,
            lineNumber: 1,
            column: 16,
            message: 'Error: Line 1: Unexpected token in'
        },

        'for ((i in {}));': {
            index: 14,
            lineNumber: 1,
            column: 15,
            message: 'Error: Line 1: Unexpected token )'
        },

        'for (i + 1 in {});': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Invalid left-hand side in for-in'
        },

        'for (+i in {});': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Invalid left-hand side in for-in'
        },

        'if(false)': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected end of input'
        },

        'if(false) doThis(); else': {
            index: 24,
            lineNumber: 1,
            column: 25,
            message: 'Error: Line 1: Unexpected end of input'
        },

        'do': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected end of input'
        },

        'while(false)': {
            index: 12,
            lineNumber: 1,
            column: 13,
            message: 'Error: Line 1: Unexpected end of input'
        },

        'for(;;)': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected end of input'
        },

        'with(x)': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected end of input'
        },

        'try { }': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Missing catch or finally after try'
        },

        '\u203F = 10': {
            index: 0,
            lineNumber: 1,
            column: 1,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        'const x = 12, y;': {
            index: 15,
            lineNumber: 1,
            column: 16,
            message: 'Error: Line 1: Unexpected token ;'
        },

        'const x, y = 12;': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected token ,'
        },

        'const x;': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected token ;'
        },

        'if(true) let a = 1;': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token let'
        },

        'if(true) const a = 1;': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token const'
        },

        'new X()."s"': {
            index: 8,
            lineNumber: 1,
            column: 9,
            message: 'Error: Line 1: Unexpected string'
        },

        '/*': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '/*\n\n\n': {
            index: 5,
            lineNumber: 3,
            column: 2,
            message: 'Error: Line 3: Unexpected token ILLEGAL'
        },

        '/**': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '/*\n\n*': {
            index: 5,
            lineNumber: 3,
            column: 2,
            message: 'Error: Line 3: Unexpected token ILLEGAL'
        },

        '/*hello': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '/*hello  *': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '\n]': {
            index: 1,
            lineNumber: 2,
            column: 1,
            message: 'Error: Line 2: Unexpected token ]'
        },

        '\r]': {
            index: 1,
            lineNumber: 2,
            column: 1,
            message: 'Error: Line 2: Unexpected token ]'
        },

        '\r\n]': {
            index: 2,
            lineNumber: 2,
            column: 1,
            message: 'Error: Line 2: Unexpected token ]'
        },

        '\n\r]': {
            index: 2,
            lineNumber: 3,
            column: 1,
            message: 'Error: Line 3: Unexpected token ]'
        },

        '//\r\n]': {
            index: 4,
            lineNumber: 2,
            column: 1,
            message: 'Error: Line 2: Unexpected token ]'
        },

        '//\n\r]': {
            index: 4,
            lineNumber: 3,
            column: 1,
            message: 'Error: Line 3: Unexpected token ]'
        },

        '//\r \n]': {
            index: 5,
            lineNumber: 3,
            column: 1,
            message: 'Error: Line 3: Unexpected token ]'
        },

        '/*\r\n*/]': {
            index: 6,
            lineNumber: 2,
            column: 3,
            message: 'Error: Line 2: Unexpected token ]'
        },

        '/*\n\r*/]': {
            index: 6,
            lineNumber: 3,
            column: 3,
            message: 'Error: Line 3: Unexpected token ]'
        },

        '/*\r \n*/]': {
            index: 7,
            lineNumber: 3,
            column: 3,
            message: 'Error: Line 3: Unexpected token ]'
        },

        '\\\\': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '\\u005c': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },


        '\\x': {
            index: 1,
            lineNumber: 1,
            column: 2,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '\\u0000': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '\u200C = []': {
            index: 0,
            lineNumber: 1,
            column: 1,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '\u200D = []': {
            index: 0,
            lineNumber: 1,
            column: 1,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '"\\': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '"\\u': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        'return': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Illegal return statement'
        },

        'break': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Illegal break statement'
        },

        'continue': {
            index: 8,
            lineNumber: 1,
            column: 9,
            message: 'Error: Line 1: Illegal continue statement'
        },

        'switch (x) { default: continue; }': {
            index: 31,
            lineNumber: 1,
            column: 32,
            message: 'Error: Line 1: Illegal continue statement'
        },

        'while (true) { break x; }': {
            index: 22,
            lineNumber: 1,
            column: 23,
            message: 'Error: Line 1: Undefined label \'x\''
        },

        'while (true) { continue x; }': {
            index: 25,
            lineNumber: 1,
            column: 26,
            message: 'Error: Line 1: Undefined label \'x\''
        },

        'x: while (true) { (function () { break x; }); }': {
            index: 40,
            lineNumber: 1,
            column: 41,
            message: 'Error: Line 1: Undefined label \'x\''
        },

        'x: while (true) { (function () { continue x; }); }': {
            index: 43,
            lineNumber: 1,
            column: 44,
            message: 'Error: Line 1: Undefined label \'x\''
        },

        'x: while (true) { (function () { break; }); }': {
            index: 39,
            lineNumber: 1,
            column: 40,
            message: 'Error: Line 1: Illegal break statement'
        },

        'x: while (true) { (function () { continue; }); }': {
            index: 42,
            lineNumber: 1,
            column: 43,
            message: 'Error: Line 1: Illegal continue statement'
        },

        'x: while (true) { x: while (true) { } }': {
            index: 20,
            lineNumber: 1,
            column: 21,
            message: 'Error: Line 1: Label \'x\' has already been declared'
        },

        '(function () { \'use strict\'; delete i; }())': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Delete of an unqualified identifier in strict mode.'
        },

        '(function () { \'use strict\'; with (i); }())': {
            index: 28,
            lineNumber: 1,
            column: 29,
            message: 'Error: Line 1: Strict mode code may not include a with statement'
        },

        'function hello() {\'use strict\'; ({ i: 42, i: 42 }) }': {
            index: 47,
            lineNumber: 1,
            column: 48,
            message: 'Error: Line 1: Duplicate data property in object literal not allowed in strict mode'
        },

        'function hello() {\'use strict\'; ({ hasOwnProperty: 42, hasOwnProperty: 42 }) }': {
            index: 73,
            lineNumber: 1,
            column: 74,
            message: 'Error: Line 1: Duplicate data property in object literal not allowed in strict mode'
        },

        'function hello() {\'use strict\'; var eval = 10; }': {
            index: 40,
            lineNumber: 1,
            column: 41,
            message: 'Error: Line 1: Variable name may not be eval or arguments in strict mode'
        },

        'function hello() {\'use strict\'; var arguments = 10; }': {
            index: 45,
            lineNumber: 1,
            column: 46,
            message: 'Error: Line 1: Variable name may not be eval or arguments in strict mode'
        },

        'function hello() {\'use strict\'; try { } catch (eval) { } }': {
            index: 51,
            lineNumber: 1,
            column: 52,
            message: 'Error: Line 1: Catch variable may not be eval or arguments in strict mode'
        },

        'function hello() {\'use strict\'; try { } catch (arguments) { } }': {
            index: 56,
            lineNumber: 1,
            column: 57,
            message: 'Error: Line 1: Catch variable may not be eval or arguments in strict mode'
        },

        'function hello() {\'use strict\'; eval = 10; }': {
            index: 36,
            lineNumber: 1,
            column: 37,
            message: 'Error: Line 1: Assignment to eval or arguments is not allowed in strict mode'
        },

        'function hello() {\'use strict\'; arguments = 10; }': {
            index: 41,
            lineNumber: 1,
            column: 42,
            message: 'Error: Line 1: Assignment to eval or arguments is not allowed in strict mode'
        },

        'function hello() {\'use strict\'; ++eval; }': {
            index: 38,
            lineNumber: 1,
            column: 39,
            message: 'Error: Line 1: Prefix increment/decrement may not have eval or arguments operand in strict mode'
        },

        'function hello() {\'use strict\'; --eval; }': {
            index: 38,
            lineNumber: 1,
            column: 39,
            message: 'Error: Line 1: Prefix increment/decrement may not have eval or arguments operand in strict mode'
        },

        'function hello() {\'use strict\'; ++arguments; }': {
            index: 43,
            lineNumber: 1,
            column: 44,
            message: 'Error: Line 1: Prefix increment/decrement may not have eval or arguments operand in strict mode'
        },

        'function hello() {\'use strict\'; --arguments; }': {
            index: 43,
            lineNumber: 1,
            column: 44,
            message: 'Error: Line 1: Prefix increment/decrement may not have eval or arguments operand in strict mode'
        },

        'function hello() {\'use strict\'; eval++; }': {
            index: 36,
            lineNumber: 1,
            column: 37,
            message: 'Error: Line 1: Postfix increment/decrement may not have eval or arguments operand in strict mode'
        },

        'function hello() {\'use strict\'; eval--; }': {
            index: 36,
            lineNumber: 1,
            column: 37,
            message: 'Error: Line 1: Postfix increment/decrement may not have eval or arguments operand in strict mode'
        },

        'function hello() {\'use strict\'; arguments++; }': {
            index: 41,
            lineNumber: 1,
            column: 42,
            message: 'Error: Line 1: Postfix increment/decrement may not have eval or arguments operand in strict mode'
        },

        'function hello() {\'use strict\'; arguments--; }': {
            index: 41,
            lineNumber: 1,
            column: 42,
            message: 'Error: Line 1: Postfix increment/decrement may not have eval or arguments operand in strict mode'
        },

        'function hello() {\'use strict\'; function eval() { } }': {
            index: 41,
            lineNumber: 1,
            column: 42,
            message: 'Error: Line 1: Function name may not be eval or arguments in strict mode'
        },

        'function hello() {\'use strict\'; function arguments() { } }': {
            index: 41,
            lineNumber: 1,
            column: 42,
            message: 'Error: Line 1: Function name may not be eval or arguments in strict mode'
        },

        'function eval() {\'use strict\'; }': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Function name may not be eval or arguments in strict mode'
        },

        'function arguments() {\'use strict\'; }': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Function name may not be eval or arguments in strict mode'
        },

        'function hello() {\'use strict\'; (function eval() { }()) }': {
            index: 42,
            lineNumber: 1,
            column: 43,
            message: 'Error: Line 1: Function name may not be eval or arguments in strict mode'
        },

        'function hello() {\'use strict\'; (function arguments() { }()) }': {
            index: 42,
            lineNumber: 1,
            column: 43,
            message: 'Error: Line 1: Function name may not be eval or arguments in strict mode'
        },

        '(function eval() {\'use strict\'; })()': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Function name may not be eval or arguments in strict mode'
        },

        '(function arguments() {\'use strict\'; })()': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Function name may not be eval or arguments in strict mode'
        },

        'function hello() {\'use strict\'; ({ s: function eval() { } }); }': {
            index: 47,
            lineNumber: 1,
            column: 48,
            message: 'Error: Line 1: Function name may not be eval or arguments in strict mode'
        },

        'function hello() {\'use strict\'; ({ i: 10, set s(eval) { } }); }': {
            index: 48,
            lineNumber: 1,
            column: 49,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        'function hello() {\'use strict\'; ({ set s(eval) { } }); }': {
            index: 41,
            lineNumber: 1,
            column: 42,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        'function hello() {\'use strict\'; ({ s: function s(eval) { } }); }': {
            index: 49,
            lineNumber: 1,
            column: 50,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        'function hello(eval) {\'use strict\';}': {
            index: 15,
            lineNumber: 1,
            column: 16,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        'function hello(arguments) {\'use strict\';}': {
            index: 15,
            lineNumber: 1,
            column: 16,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        'function hello() { \'use strict\'; function inner(eval) {} }': {
            index: 48,
            lineNumber: 1,
            column: 49,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        'function hello() { \'use strict\'; function inner(arguments) {} }': {
            index: 48,
            lineNumber: 1,
            column: 49,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        'function hello() { \'use strict\'; "\\1"; }': {
            index: 33,
            lineNumber: 1,
            column: 34,
            message: 'Error: Line 1: Octal literals are not allowed in strict mode.'
        },

        'function hello() { \'use strict\'; 021; }': {
            index: 33,
            lineNumber: 1,
            column: 34,
            message: 'Error: Line 1: Octal literals are not allowed in strict mode.'
        },

        'function hello() { \'use strict\'; ({ "\\1": 42 }); }': {
            index: 36,
            lineNumber: 1,
            column: 37,
            message: 'Error: Line 1: Octal literals are not allowed in strict mode.'
        },

        'function hello() { \'use strict\'; ({ 021: 42 }); }': {
            index: 36,
            lineNumber: 1,
            column: 37,
            message: 'Error: Line 1: Octal literals are not allowed in strict mode.'
        },

        'function hello() { "octal directive\\1"; "use strict"; }': {
            index: 19,
            lineNumber: 1,
            column: 20,
            message: 'Error: Line 1: Octal literals are not allowed in strict mode.'
        },

        'function hello() { "octal directive\\1"; "octal directive\\2"; "use strict"; }': {
            index: 19,
            lineNumber: 1,
            column: 20,
            message: 'Error: Line 1: Octal literals are not allowed in strict mode.'
        },

        'function hello() { "use strict"; function inner() { "octal directive\\1"; } }': {
            index: 52,
            lineNumber: 1,
            column: 53,
            message: 'Error: Line 1: Octal literals are not allowed in strict mode.'
        },

        'function hello() { "use strict"; var implements; }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function hello() { "use strict"; var interface; }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function hello() { "use strict"; var package; }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function hello() { "use strict"; var private; }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function hello() { "use strict"; var protected; }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function hello() { "use strict"; var public; }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function hello() { "use strict"; var static; }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function hello() { "use strict"; var yield; }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function hello() { "use strict"; var let; }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function hello(static) { "use strict"; }': {
            index: 15,
            lineNumber: 1,
            column: 16,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'function static() { "use strict"; }': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        },

        'var yield': {
            index: 4,
            lineNumber: 1,
            column: 5,
            message: 'Error: Line 1: Unexpected token yield'
        },

        'var let': {
            index: 4,
            lineNumber: 1,
            column: 5,
            message: 'Error: Line 1: Unexpected token let'
        },

        '"use strict"; function static() { }': {
            index: 23,
            lineNumber: 1,
            column: 24,
            message: 'Error: Line 1: Use of future reserved word in strict mode'
        }

    },

    'API': {
        'parse()': {
            call: 'parse',
            args: [],
            result: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'undefined'
                    }
                }]
            }
        },

        'parse(null)': {
            call: 'parse',
            args: [null],
            result: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: null
                    }
                }]
            }
        },

        'parse(42)': {
            call: 'parse',
            args: [42],
            result: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 42
                    }
                }]
            }
        },

        'parse(true)': {
            call: 'parse',
            args: [true],
            result: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: true
                    }
                }]
            }
        },

        'parse(undefined)': {
            call: 'parse',
            args: [void 0],
            result: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'undefined'
                    }
                }]
            }
        },

        'parse(new String("test"))': {
            call: 'parse',
            args: [new String('test')],
            result: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'test'
                    }
                }]
            }
        },

        'parse(new Number(42))': {
            call: 'parse',
            args: [new Number(42)],
            result: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 42
                    }
                }]
            }
        },

        'parse(new Boolean(true))': {
            call: 'parse',
            args: [new Boolean(true)],
            result: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: true
                    }
                }]
            }
        }

    }
};

// Special handling for regular expression literal since we need to
// convert it to a string literal, otherwise it will be decoded
// as object "{}" and the regular expression would be lost.
function adjustRegexLiteral(key, value) {
    'use strict';
    if (key === 'value' && value instanceof RegExp) {
        value = value.toString();
    }
    return value;
}

if (typeof window === 'undefined') {
    var esprima = require('../esprima');
}

function NotMatchingError(expected, actual) {
    'use strict';
    Error.call(this, 'Expected ');
    this.expected = expected;
    this.actual = actual;
}
NotMatchingError.prototype = new Error();

function testParse(code, syntax) {
    'use strict';
    var expected, tree, actual, options, StringObject;

    // alias, so that JSLint does not complain.
    StringObject = String;

    options = {
        comment: (typeof syntax.comments !== 'undefined'),
        range: true,
        loc: true,
        tokens: (typeof syntax.tokens !== 'undefined'),
        raw: true
    };

    expected = JSON.stringify(syntax, null, 4);
    try {
        tree = esprima.parse(code, options);
        tree = (options.comment || options.tokens) ? tree : tree.body[0];
        actual = JSON.stringify(tree, adjustRegexLiteral, 4);

        // Only to ensure that there is no error when using string object.
        esprima.parse(new StringObject(code), options);

    } catch (e) {
        throw new NotMatchingError(expected, e.toString());
    }
    if (expected !== actual) {
        throw new NotMatchingError(expected, actual);
    }
}

function testIdentity(code, syntax) {
    'use strict';
    var expected, tree, actual, options, StringObject;

    // alias, so that JSLint does not complain.
    StringObject = String;

    options = {
        comment: false,
        range: false,
        loc: false,
        tokens: false,
        raw: false
    };

    try {
        tree = esprima.parse(code, options);
        expected = JSON.stringify(tree, adjustRegexLiteral, 4);
        tree = esprima.parse(esprima.generate(tree), options);
        actual = JSON.stringify(tree, adjustRegexLiteral, 4);
    } catch (e) {
        throw new NotMatchingError(expected, e.toString());
    }
    if (expected !== actual) {
        throw new NotMatchingError(expected, actual);
    }
}

function testError(code, exception) {
    'use strict';
    var expected, msg, actual;

    expected = JSON.stringify(exception);

    try {
        esprima.parse(code);
    } catch (e) {
        msg = e.toString();

        // Opera 9.64 produces an non-standard string in toString().
        if (msg.substr(0, 6) !== 'Error:') {
            if (typeof e.message === 'string') {
                msg = 'Error: ' + e.message;
            }
        }

        actual = JSON.stringify({
            index: e.index,
            lineNumber: e.lineNumber,
            column: e.column,
            message: msg
        });

    }

    if (expected !== actual) {
        throw new NotMatchingError(expected, actual);
    }
}

function testModify(code, result) {
    'use strict';
    var actual, expected, i, modifier, config, modifiers;

    function findModifier(name) {
        var properties = name.split('.'),
            object = esprima,
            i;
        for (i = 0; i < properties.length; i += 1) {
            object = object[properties[i]];
        }
        return object;
    }

    function customTracerFunction(functionInfo) {
        var name = functionInfo.name,
            lineNumber = functionInfo.loc.start.line;
        return '// function "' + name + '" at line ' + lineNumber + '\n';
    }

    if (Object.prototype.toString.call(result.modifiers) === '[object Array]') {
        modifiers = [];
        for (i = 0; i < result.modifiers.length; i += 1) {
            modifier = result.modifiers[i];
            config = modifier.config;
            if (config === 'customTracer') {
                config = customTracerFunction;
            }
            modifiers.push(findModifier(modifier.name).call(null, config));
        }
    } else {
        modifier = result.modifiers;
        config = modifier.config;
        if (config === 'customTracer') {
            config = customTracerFunction;
        }
        modifiers = findModifier(modifier.name).call(null, config);
    }

    expected = result.result;
    try {
        actual = esprima.modify(code, modifiers);
    } catch (e) {
        throw new NotMatchingError(expected, e.toString());
    }
    if (expected !== actual) {
        throw new NotMatchingError(expected, actual);
    }
}

function testGenerate(expected, result) {
    'use strict';
    var actual;

    try {
        actual = esprima.generate(result.from, { indent: '    ' });
    } catch (e) {
        throw new NotMatchingError(expected, e.toString());
    }
    if (expected !== actual) {
        throw new NotMatchingError(expected, actual);
    }
}

function testAPI(code, result) {
    'use strict';
    var expected, res, actual;

    expected = JSON.stringify(result.result, null, 4);
    try {
        res = esprima[result.call].apply(esprima, result.args);
        actual = JSON.stringify(res, adjustRegexLiteral, 4);
    } catch (e) {
        throw new NotMatchingError(expected, e.toString());
    }
    if (expected !== actual) {
        throw new NotMatchingError(expected, actual);
    }
}

function isGeneratorIdentityFixture(result) {
    'use strict';
    return !result.hasOwnProperty('lineNumber') &&
        !result.hasOwnProperty('modifiers') &&
        !result.hasOwnProperty('from') &&
        !result.hasOwnProperty('result');
}

function runTest(code, result) {
    'use strict';
    if (result.hasOwnProperty('lineNumber')) {
        testError(code, result);
    } else if (result.hasOwnProperty('modifiers')) {
        testModify(code, result);
    } else if (result.hasOwnProperty('from')) {
        testGenerate(code, result);
    } else if (result.hasOwnProperty('result')) {
        testAPI(code, result);
    } else {
        testParse(code, result);
    }
}

if (typeof window !== 'undefined') {
    // Run all tests in a browser environment.
    runTests = function () {
        'use strict';
        var total = 0,
            failures = 0,
            category,
            fixture,
            source,
            tick,
            expected,
            fixtures,
            fixture,
            index,
            len;

        function setText(el, str) {
            if (typeof el.innerText === 'string') {
                el.innerText = str;
            } else {
                el.textContent = str;
            }
        }

        function startCategory(category) {
            var report, e;
            report = document.getElementById('report');
            e = document.createElement('h4');
            setText(e, category);
            report.appendChild(e);
        }

        function reportSuccess(code) {
            var report, e;
            report = document.getElementById('report');
            e = document.createElement('pre');
            e.setAttribute('class', 'code');
            setText(e, code);
            report.appendChild(e);
        }

        function reportFailure(code, expected, actual) {
            var report, e;

            report = document.getElementById('report');

            e = document.createElement('p');
            setText(e, 'Code:');
            report.appendChild(e);

            e = document.createElement('pre');
            e.setAttribute('class', 'code');
            setText(e, code);
            report.appendChild(e);

            e = document.createElement('p');
            setText(e, 'Expected');
            report.appendChild(e);

            e = document.createElement('pre');
            e.setAttribute('class', 'expected');
            setText(e, expected);
            report.appendChild(e);

            e = document.createElement('p');
            setText(e, 'Actual');
            report.appendChild(e);

            e = document.createElement('pre');
            e.setAttribute('class', 'actual');
            setText(e, actual);
            report.appendChild(e);
        }

        setText(document.getElementById('version'), esprima.version);

        tick = new Date();
        fixtures = [];
        for (category in data) {
            if (data.hasOwnProperty(category)) {
                startCategory(category);
                fixture = data[category];
                for (source in fixture) {
                    if (fixture.hasOwnProperty(source)) {
                        expected = fixture[source];
                        total += 1;
                        if (isGeneratorIdentityFixture(expected)) {
                            fixtures.push({
                                source: source,
                                expected: expected
                            });
                        }
                        try {
                            runTest(source, expected);
                            reportSuccess(source, JSON.stringify(expected, null, 4));
                        } catch (e) {
                            failures += 1;
                            reportFailure(source, e.expected, e.actual);
                        }
                    }
                }
            }
        }

        startCategory('Generateor Identity');
        for (index = 0, len = fixtures.length; index < len; index += 1) {
            total += 1;
            try {
                fixture = fixtures[index];
                testIdentity(fixture.source, fixture.expected);
                reportSuccess(fixture.source, JSON.stringify(fixture.expected, null, 4));
            } catch (e) {
                failures += 1;
                reportFailure(fixture.source, e.expected, e.actual);
            }
        }

        tick = (new Date()) - tick;

        if (failures > 0) {
            setText(document.getElementById('status'), total + ' tests. ' +
                'Failures: ' + failures + '. ' + tick + ' ms');
        } else {
            setText(document.getElementById('status'), total + ' tests. ' +
                'No failure. ' + tick + ' ms');
        }
    };
} else {
    (function () {
        'use strict';

        var total = 0,
            failures = [],
            tick = new Date(),
            expected,
            header,
            fixtures;

        fixtures = [];
        Object.keys(data).forEach(function (category) {
            Object.keys(data[category]).forEach(function (source) {
                total += 1;
                expected = data[category][source];
                if (isGeneratorIdentityFixture(expected)) {
                    fixtures.push({
                        source: source,
                        expected: expected
                    });
                }
                try {
                    runTest(source, expected);
                } catch (e) {
                    e.source = source;
                    failures.push(e);
                }
            });
        });
        fixtures.forEach(function (fixture) {
            total += 1;
            try {
                testIdentity(fixture.source, fixture.expected);
            } catch (e) {
                e.source = fixture.source;
                failures.push(e);
            }
        });
        tick = (new Date()) - tick;

        header = total + ' tests. ' + failures.length + ' failures. ' +
            tick + ' ms';
        if (failures.length) {
            console.error(header);
            failures.forEach(function (failure) {
                console.error(failure.source + ': Expected\n    ' +
                    failure.expected.split('\n').join('\n    ') +
                    '\nto match\n    ' + failure.actual);
            });
        } else {
            console.log(header);
        }
        process.exit(failures.length === 0 ? 0 : 1);
    }());
}
/* vim: set sw=4 ts=4 et tw=80 : */
