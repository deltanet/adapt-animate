# adapt-animate

**Animate** is an *extension* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension adds CSS animation to Article, Block and Component elements. Animatoins available are based on [Animate.css by Daniel Eden](https://daneden.github.io/animate.css/).  

## Installation

This extension must be manually installed.

If **Animate** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Settings Overview

**Animate** is configured on all levels: course (*course.json*), contentObject (*contentObjects.json*), article (*articles.json*), block (*blocks.json*) and component (*components.json*).

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-animate/blob/master/example.json).  

### Attributes

**Course**  

The Animate attribute group at course level contains values for **_isEnabled**, **_article**, **_block**, and **_component**.

>**_isEnabled** (boolean):  Turns on and off the **Animate** extension. Can be set to disable **Animate** when not required.

>**_article** (object): This `_article` attributes group stores the properties for all Articles in the course. It contains values for **_isEnabled**, **_title**, **_body**, **_instruction**, and **_custom**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Articles in the course.  

>>**_title** (object): This `_title` attributes group stores the properties for title animations. It contains values for **_isEnabled**, and **_effect**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Article titles in the course.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>**_body** (object): This `_body` attributes group stores the properties for body text animations. It contains values for **_isEnabled**, and **_effect**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Article body text in the course.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>**_instruction** (object): This `_instruction` attributes group stores the properties for instruction text animations. It contains values for **_isEnabled**, and **_effect**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Article instruction text in the course.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>**_custom** (object): This `_custom` attributes group stores the properties for any custom animations. It contains values for **_isEnabled**, **_element**, **_effect**, **_delay**, and **_items**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on custom elements within an Article.  

>>>**_element** (string):  Defines the div element the animation is applied to.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>>**_items** (array): Multiple items may be created. It contains values for **_element**, **_effect**, and **_delay**.

>>>>**_element** (string):  Defines the div element the animation is applied to.  

>>>>**_effect** (string):  Defines the CSS animation name.  

>>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_block** (object): This `_block` attributes group stores the properties for all Blocks in the course. It contains values for **_isEnabled**, **_title**, **_body**, **_instruction**, and **_custom**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Blocks in the course.  

>>**_title** (object): This `_title` attributes group stores the properties for title animations. It contains values for **_isEnabled**, and **_effect**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Block titles in the course.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>**_body** (object): This `_body` attributes group stores the properties for body text animations. It contains values for **_isEnabled**, and **_effect**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Block body text in the course.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>**_instruction** (object): This `_instruction` attributes group stores the properties for instruction text animations. It contains values for **_isEnabled**, and **_effect**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Block instruction text in the course.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>**_custom** (object): This `_custom` attributes group stores the properties for any custom animations. It contains values for **_isEnabled**, **_element**, **_effect**, **_delay**, and **_items**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on custom elements within a Block.  

>>>**_element** (string):  Defines the div element the animation is applied to.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>>**_items** (array): Multiple items may be created. It contains values for **_element**, **_effect**, and **_delay**.

>>>>**_element** (string):  Defines the div element the animation is applied to.  

>>>>**_effect** (string):  Defines the CSS animation name.  

>>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_component** (object): This `_component` attributes group stores the properties for all Components in the course. It contains values for **_isEnabled**, **_title**, **_body**, **_instruction**, and **_custom**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Components in the course.  

>>**_title** (object): This `_title` attributes group stores the properties for title animations. It contains values for **_isEnabled**, and **_effect**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Component titles in the course.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>**_body** (object): This `_body` attributes group stores the properties for body text animations. It contains values for **_isEnabled**, and **_effect**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Component body text in the course.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>**_instruction** (object): This `_instruction` attributes group stores the properties for instruction text animations. It contains values for **_isEnabled**, and **_effect**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on all Component instruction text in the course.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>**_custom** (object): This `_custom` attributes group stores the properties for any custom animations. It contains values for **_isEnabled**, **_element**, **_effect**, **_delay**, and **_items**.  

>>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on custom elements within a Component.  

>>>**_element** (string):  Defines the div element the animation is applied to.  

>>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>>**_items** (array): Multiple items may be created. It contains values for **_element**, **_effect**, and **_delay**.

>>>>**_element** (string):  Defines the div element the animation is applied to.  

>>>>**_effect** (string):  Defines the CSS animation name.  

>>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

<div float align=right><a href="#top">Back to Top</a></div>

**ContentObject**  

The Animate attribute group at contentObject level contains values for **_isEnabled**, **_title**, **_body**, and **_custom**.

>**_isEnabled** (boolean):  Turns on and off the **Animate** extension. Can be set to disable **Animate** when not required.

>**_title** (object): This `_title` attributes group stores the properties for title animations. It contains values for **_isEnabled**, and **_effect**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_body** (object): This `_body` attributes group stores the properties for body text animations. It contains values for **_isEnabled**, and **_effect**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_custom** (object): This `_custom` attributes group stores the properties for any custom animations. It contains values for **_isEnabled**, **_element**, **_effect**, **_delay**, and **_items**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on custom elements.  

>>**_element** (string):  Defines the div element the animation is applied to.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>>**_items** (array): Multiple items may be created. It contains values for **_element**, **_effect**, and **_delay**.

>>>>**_element** (string):  Defines the div element the animation is applied to.  

>>>>**_effect** (string):  Defines the CSS animation name.  

>>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

<div float align=right><a href="#top">Back to Top</a></div>  

**Article and Block**  

The Animate attribute group at article and block level contains values for **_isEnabled**, **_title**, **_body**, **_instruction**, and **_custom**.

>**_isEnabled** (boolean):  Turns on and off the **Animate** extension. Can be set to disable **Animate** when not required.

>**_title** (object): This `_title` attributes group stores the properties for title animations. It contains values for **_isEnabled**, and **_effect**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_body** (object): This `_body` attributes group stores the properties for body text animations. It contains values for **_isEnabled**, and **_effect**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_instruction** (object): This `_instruction` attributes group stores the properties for instruction text animations. It contains values for **_isEnabled**, and **_effect**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_custom** (object): This `_custom` attributes group stores the properties for any custom animations. It contains values for **_isEnabled**, **_element**, **_effect**, **_delay**, and **_items**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on custom elements.  

>>**_element** (string):  Defines the div element the animation is applied to.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>>**_items** (array): Multiple items may be created. It contains values for **_element**, **_effect**, and **_delay**.

>>>>**_element** (string):  Defines the div element the animation is applied to.  

>>>>**_effect** (string):  Defines the CSS animation name.  

>>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

<div float align=right><a href="#top">Back to Top</a></div>  

**Component**  

The Animate attribute group at component level contains values for **_isEnabled**, **_completeElement**, **_title**, **_body**, **_instruction**, and **_custom**.

>**_isEnabled** (boolean):  Turns on and off the **Animate** extension. Can be set to disable **Animate** when not required.  

>**_completeElement** (object): This `_completeElement` attributes group stores the properties for animating all elements in the component. It contains values for **_isEnabled**, and **_effect**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_title** (object): This `_title` attributes group stores the properties for title animations. It contains values for **_isEnabled**, and **_effect**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_body** (object): This `_body` attributes group stores the properties for body text animations. It contains values for **_isEnabled**, and **_effect**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_instruction** (object): This `_instruction` attributes group stores the properties for instruction text animations. It contains values for **_isEnabled**, and **_effect**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>**_custom** (object): This `_custom` attributes group stores the properties for any custom animations. It contains values for **_isEnabled**, **_element**, **_effect**, **_delay**, and **_items**.  

>>**_isEnabled** (boolean):  Turns on and off the **Animate** extension on custom elements.  

>>**_element** (string):  Defines the div element the animation is applied to.  

>>**_effect** (string):  Defines the CSS animation name.  

>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

>>>**_items** (array): Multiple items may be created. It contains values for **_element**, **_effect**, and **_delay**.

>>>>**_element** (string):  Defines the div element the animation is applied to.  

>>>>**_effect** (string):  Defines the CSS animation name.  

>>>>**_delay** (number):  This numeric value represents the delay in seconds before the animation starts.  

<div float align=right><a href="#top">Back to Top</a></div>

## Limitations

No known limitations.

----------------------------
**Version number:**  3.1.1   
**Framework versions supported:**  5.8+    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-animate/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** NA     
**Authoring tool support:** Yes
