# v0.1.0
- Already at the end of major overhaul.  
- withGlobalContext, ListHOC
- Lists are sortable (on mobile too)
- Animations need a thorough examination/refactoring

# v0.0.10
- Added editing for all item types (Gratitudes, Tasks, ...)
- Fixed dates being off by one day
- Lots of code cleanup
- Add documentation for AppState
- Add documentation for Helpers

# v0.0.9
- Fixed critical bug where deleting a Priority caused Tasks to overwrite Projects

# v0.0.8
- Integrated Signup/Signin into the CloudSync component
- Extracted and Animated Credits route
- Added location state for back/add PageNavigation
- Removed edit button until it's functional to avoid confusion
- Updated Submenu styling to better reflect iOS look
- Brightened the colors of Settings, it felt too dark.
- Prevent long text overlap in PageNavigation
- Show correct Instructions for Priorites
- Remove unused fn setBackground

# v0.0.7
- Removed react-scripts 2.0.1 because it made updating Service Workers more difficult
- Add node-sass for Sass pre-processing
- Refactored CSS file structures
- Update build scripts to account for Sass
- UI Tweaks to Settings

# v0.0.6
- Separate plain/auth'd Settings
- Converted CSS to Sass
- Added sass by upgrading to react-scripts 2.0.1

# v0.0.5
- Solved list colors!! Hopefully for good.
- Fixed decimal color values, preventing color display in Safari
- Smoother list-item deletion animation
- Removed fontawesome
- Clear out console warnings
- Try to force hardware acceleration with transform
- Adjust Instruction display
- Started CHANGELOG
