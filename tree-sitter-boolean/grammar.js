module.exports = grammar({
    name: 'boolean',

    rules: {
        expression: $ => repeat($.statement),

        _literal: $ => choice(
            $.true,
            $.false,
        ),

        true: $ => 'true',

        false: $ => 'false',
    }
});