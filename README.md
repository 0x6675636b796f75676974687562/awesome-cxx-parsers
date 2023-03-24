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
   &mdash; incorrectly recognizes field access as an `identifier` (i.e. local variable) and not a `field_identifier` (for the code to be parsed correctly, one should change `height` &rarr; `this.height`). The same error affects simpler to parse languages, such as _Java_.
 * [Playground](https://fwcd.dev/tree-sitter-kotlin/) (Kotlin grammar, unofficial)

   Similarly, both field access and local variable access are erroneously recognized as `simple_identifier`:
   ```kotlin
   class Shape(private val height: Int) {
     fun getHeight(): Int {
       return height
     }
   }
   ```
## [CodeQL](https://codeql.github.com)
 * [C and C++ status](https://codeql.github.com/docs/codeql-overview/supported-languages-and-frameworks):
