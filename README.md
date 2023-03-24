# Awesome C++ Parsers
An overview of C and C++ parsers available for Kotlin/JVM and Kotlin/MP

## [Clang](https://clang.llvm.org)

### CLI (`clang`)

 * Kotlin/JVM ✔, Kotlin/MP ✔
 * Available since at least _Clang_ version 11.
 * [_Rust_ bindings](https://github.com/dtolnay/clang-ast)

#### Overview

Getting an AST tree is as easy as

```bash
clang++ -fsyntax-only -Xclang -ast-dump=json file.cc >file.json
```

The AST can also be dumped in binary form, to be later on consumed and parsed by
[`libclang`](#libclang-c-interface-to-clang) ([example](https://bastian.rieck.me/blog/posts/2015/baby_steps_libclang_ast/)):

```bash
# Will produce file.ast
clang++ -emit-ast file.cc
```

#### Example

Here's a [JSON output](Shape.json) for a [sample C++ class](Shape.cc).

Field access on [line 8](Shape.cc#L8) is correctly recognized as a
[`clang::MemberExpr`](Shape.json#L554)
([reference](https://clang.llvm.org/doxygen/classclang_1_1MemberExpr.html)).

Notably, GCC-style mangled C++ symbol names are also stored in the JSON:

```json
{
   "id": "0x8001988b0",
   "kind": "ParmVarDecl",
   "loc": {
      "offset": 36,
      "line": 3,
      "col": 15,
      "tokLen": 11
   },
   "range": {
      "begin": {
         "offset": 32,
         "col": 11,
         "tokLen": 3
      },
      "end": {
         "offset": 36,
         "col": 15,
         "tokLen": 11
      }
   },
   "isUsed": true,
   "name": "shapeHeight",
   "mangledName": "_ZZN5ShapeC1EiE11shapeHeight",
   "type": {
      "qualType": "int"
   }
}
```

Here, `_ZZN5ShapeC1EiE11shapeHeight` is a mangled name which corresponds to
`Shape::Shape(int)::shapeHeight`:

```console
$ echo '_ZZN5ShapeC1EiE11shapeHeight' | c++filt
Shape::Shape(int)::shapeHeight
```

`ParmVarDecl` specifies a JSON-serialized instance of
[`clang::ParmVarDecl`](https://clang.llvm.org/doxygen/classclang_1_1ParmVarDecl.html)
class from the [C++ API](https://clang.llvm.org/doxygen/namespaceclang.html).

### [`clangd`](https://clangd.llvm.org/)

 * Kotlin/JVM ✔, Kotlin/MP ✔
 * Supports [LSP **3.17**](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)
    plus [extensions](https://clangd.llvm.org/extensions)
 * Can provide [`clang::clangd::ParsedAST`](https://clang.llvm.org/extra/doxygen/classclang_1_1clangd_1_1ParsedAST.html),
    which, in turn, can be used to access [`clang::ASTContext`](https://clang.llvm.org/doxygen/classclang_1_1ASTContext.html)
 * [Features](https://clangd.llvm.org/features)

#### Overview

 * Sample response [JSON response](clangd-response.json) from `clangd`.
 * `clangd` tool window in _CLion_:

    ![](images/clion-clangd-tool-window.png) 

#### Used by

 * [_JetBrains CLion_](https://www.jetbrains.com/clion/)

### `libclang`: C Interface to _Clang_

 * Java bindings to _Clang_ version **15** are available via
   [_JavaCPP Presets_](https://github.com/bytedeco/javacpp-presets/tree/master/llvm) (Kotlin/JVM ✔, Kotlin/MP ❌).
 * [API reference](https://clang.llvm.org/doxygen/group__CINDEX.html)

#### Overview

 * `libclang` has its limitations
    and [doesn't expose](https://clang.llvm.org/docs/Tooling.html#libclang) the
    entire AST.
    Read [this](https://www.foonathan.net/2017/04/cppast/) for further details.
 * `libclang` tokens are not preprocessed.

#### Examples

 * [Baby steps with libclang: Walking an abstract syntax tree](https://bastian.rieck.me/blog/posts/2015/baby_steps_libclang_ast/)
 * [Using libclang to Parse C++ (aka libclang 101)](https://shaharmike.com/cpp/libclang/)
 * <https://github.com/bytedeco/javacpp-presets/tree/master/llvm/samples/clang>

#### Used by

 * [Fraunhofer-AISEC/cpg](https://github.com/Fraunhofer-AISEC/cpg)

### `LibTooling`: C++ Interface to _Clang_

 * No Kotlin/JVM ❌, no Kotlin/MP ❌ (unless wrappers are written manually)
 * C++ API

#### Links

 * [LibTooling](https://clang.llvm.org/docs/LibTooling.html)
 * [Tutorial for building tools using LibTooling and LibASTMatchers](https://clang.llvm.org/docs/LibASTMatchersTutorial.html)
 * <https://opensource.apple.com/source/clang/clang-425.0.24/src/tools/clang/docs/LibTooling.html>

## [tree-sitter](https://github.com/tree-sitter/tree-sitter)

### Overview

 * Kotlin/JVM ✔ available via [Java bindings](https://github.com/serenadeai/java-tree-sitter)
 * Kotlin/MP ✔ possible by wrapping a native platform binary
 * Kotlin/JS ✔ possible by wrapping `tree-sitter.js`

Initially it was designed by GitHub for their [Atom IDE](https://github.com/atom/) which was sunset to be replaced by CodeHub/VS Code.
Designed to tokenize a code with some of main feature to track changes in file.

 * Articles:

   - <https://habr.com/ru/post/670140/> (in Russian)
   - <https://derek.stride.host/posts/comprehensive-introduction-to-tree-sitter>
   - <https://www.youtube.com/watch?v=Jes3bD6P0To>

### Implementations

 * [C++ Grammar](https://github.com/tree-sitter/tree-sitter-cpp) (45 🍴, 156 ⭐)
 * [Java bindings](https://github.com/serenadeai/java-tree-sitter) (19 🍴, 61 ⭐)
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

 * [CodeQL CLI](https://github.com/github/codeql-cli-binaries) is closed-source ❌
 * [CodeQL libraries and queries](https://github.com/github/codeql) are open-source, MIT-licensed ✔
 * For compiled languages like C++, it's necessary to build the project first in
   order to create a CodeQL database.
 * [C and C++ status](https://codeql.github.com/docs/codeql-overview/supported-languages-and-frameworks):
   * C++20 support is currently in beta. Supported for GCC on Linux only. Modules are _not_ supported.
   * Clang (and `clang-cl`) extensions (up to Clang 12.0)
     * Support for the `clang-cl` compiler is preliminary.
   * GNU extensions (up to GCC 11.1)
   * Microsoft extensions (up to VS 2019)
   * Arm Compiler 5
     * Support for the Arm Compiler (`armcc`) is preliminary.
 * _Visual Studio Code_ [integration](https://codeql.github.com/docs/codeql-for-visual-studio-code/)

### Links

 * [Analyzing your projects](https://codeql.github.com/docs/codeql-for-visual-studio-code/analyzing-your-projects/)
 * [Exploring the structure of your source code](https://codeql.github.com/docs/codeql-for-visual-studio-code/exploring-the-structure-of-your-source-code/)
 * [Exploring data flow with path queries](https://codeql.github.com/docs/codeql-for-visual-studio-code/exploring-data-flow-with-path-queries/)
 * [CodeQL for C and C++](https://codeql.github.com/docs/codeql-language-guides/codeql-for-cpp/)
 * [Writing CodeQL queries](https://codeql.github.com/docs/writing-codeql-queries/)
 * [CodeQL CLI manual](https://codeql.github.com/docs/codeql-cli/manual/)

## Eclipse CDT

 * Kotlin/JVM ✔ only, no Kotlin/MP ❌

### Used by

* [Fraunhofer-AISEC/cpg](https://github.com/Fraunhofer-AISEC/cpg)

## [`foonathan/cppast`](https://github.com/foonathan/cppast)

 * 157 🍴, 1.5k ⭐
 * No Kotlin/JVM ❌, no Kotlin/MP ❌ (unless wrappers are written manually)
 * C++ API
 * Was built in response to `libclang` limitations
