# cxx-parsers
An overview of C and C++ parsers available for Kotlin/JVM and Kotlin/MP

## [tree-sitter](https://github.com/tree-sitter/tree-sitter)

 * [Playground](https://tree-sitter.github.io/tree-sitter/playground) (C, C++ and other languages)
 
   Using the following C++ source code,
   ```cxx
   class Shape {
   public:
       Shape(int shapeHeight) {
           height = shapeHeight;
       }

       int getHeight() {
           return height;
       }

   private:
       int height;
   };
   ```
   &mdash; incorrectly recognizes field access as an `identifier` (i.e. local variable) and not a `field_identifier` (for the code to be parsed correctly, one should change `height` &rarr; `this.height`). The same error affects simpler to parse languages, such as Java.
