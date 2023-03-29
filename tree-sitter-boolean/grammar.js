const PREC = {
    BIT_OR: 0,      // |
    BIT_XOR: 1,     // ^
    BIT_AND: 2,     // &
    EQUALITY: 3,    // ==  !=
    UNARY: 4,       // !
};

module.exports = grammar({
    name: 'boolean',

    rules: {
        statement: $ => repeat($.expression),

        expression: $ => choice(
            $.binary_expression,
            $.unary_expression,
            $.primary_expression,
        ),

        binary_expression: $ => choice(
            ...[
                ['==', PREC.EQUALITY],
                ['!=', PREC.EQUALITY],
                ['&', PREC.BIT_AND],
                ['|', PREC.BIT_OR],
                ['^', PREC.BIT_XOR],
            ].map(([operator, precedence]) =>
                prec.left(precedence, seq(
                    field('left', $.expression),
                    field('operator', operator),
                    field('right', $.expression)
                ))
            )),

        unary_expression: $ => prec.left(PREC.UNARY, seq(
            field('operator', '!'),
            field('operand', $.expression)
        )),

        primary_expression: $ => choice(
            $._literal,
            $.identifier,
        ),

        _literal: $ => choice(
            $.true,
            $.false,
        ),


        true: $ => 'true',

        false: $ => 'false',

        identifier: $ => /[\p{L}_$][\p{L}\p{Nd}_$]*/,
    }
});