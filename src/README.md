<!-----------------------------------------------
    Main title
    - File Structure
    - Code Splitting
    - Asset Structure
        -- Restyle Framework
        -- Work with restyle framework
        -- Customize styles structure
        -- Create theme
        -- Using and changing themes
    - Components
    - i18n (Translate manager and languages)
    - Modules
    - Pages
    - Plugins
    - Router
    - Store
 -->
# Structure of design client

- [File Structure](#file-structure)
- [Code Splitting](#code-splitting)
    - [Variable Format](#variable-format)
    - [Indentation Style](#indentation-style)

<!-- File Structure -->
<a name="file-structure"></a>
## File Structure

- <strong>API</strong> => For get and send data to server
- <strong>Assets</strong> => Styles language: <strong>Stylus</strong>
    - <strong>Restyle framework</strong> => You can clone it from <a href="https://gitlab.com/mostafarde/restyle">https://gitlab.com/mostafarde/restyle</a>
    - <strong>styles</strong> => This is main route for custom style of site
        - <strong>config.styl</strong> => It has systematic variables for example "theme" variable
        - <strong>custom.styl</strong> => You can write freely design codes in here
        - <strong>icons.styl</strong> => It has config of icons that have multiple styles
        - <strong>plugins.styl</strong> => It has styles for customize plugins
        - <strong>themes</strong>
            - <strong>dark</strong>
            - <strong>light</strong>
        - <strong>index.styl</strong> => Loader styles
- <strong>Components</strong> => The components directory has all parts public codes of site that use its in html and vue or all design codes
    - <strong>Custom components create with restyle</strong>
    - <strong>Custom components</strong>
    - <strong>Adapters</strong>
- <strong>i18n</strong> => This directory is dictionary and translator for all site
    - <strong>locales (languages as "json" file)</strong>
- <strong>Modules</strong> => This directory has modules and codes for designing
- <strong>Pages</strong> => The directory has all pages and children routes
- <strong>Plugins</strong> => This directory has all loader and initialize plugins of webpack and other some as VueJs
- <strong>Router</strong> => Vue Router
- <strong>Store</strong> => Vuex

<a name="code-splitting"></a>
## Code Splitting

<a name="variable-format"></a>
### Variable Format
    [type][name](Camel mode programming naming)
###### example
    $colorBlack (typeof Color)
    $colorWhite (typeof Color)
    $isAuth     (typeof Boolean)
    
<a href="indentation-style"></a>
### Indentation style
using <a href="https://en.wikipedia.org/wiki/Indentation_style#Lisp_style">Lisp style</a> for indentation style programming in stylus
