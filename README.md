# Awesome C++ Parsers
An overview of C and C++ parsers available for Kotlin/JVM and Kotlin/MP

## [Clang](https://clang.llvm.org)

### CLI (`clang`)

Getting an AST tree is as easy as

```bash
clang -fsyntax-only -Xclang -ast-dump=json file.cc >file.json
```

This is supported since at least _Clang_ version 11.

## [tree-sitter](https://github.com/tree-sitter/tree-sitter)

 * [C++ Grammar](https://github.com/tree-sitter/tree-sitter-cpp) (45 🍴, 156 ⭐)
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
 * [No public repositories](https://github.com/codeql)
 * [C and C++ status](https://codeql.github.com/docs/codeql-overview/supported-languages-and-frameworks):
   * C++20 support is currently in beta. Supported for GCC on Linux only. Modules are _not_ supported.
   * Clang (and `clang-cl`) extensions (up to Clang 12.0)
     * Support for the `clang-cl` compiler is preliminary.
   * GNU extensions (up to GCC 11.1)
   * Microsoft extensions (up to VS 2019)
   * Arm Compiler 5
     * Support for the Arm Compiler (`armcc`) is preliminary.
 * _Visual Studio Code_ [integration](https://codeql.github.com/docs/codeql-for-visual-studio-code/)

## Eclipse CDT
 * Kotlin/JVM only
