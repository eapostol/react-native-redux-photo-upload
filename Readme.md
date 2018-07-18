# react-native-redux-photo-upload
Credit to [omarkhaled11](https://github.com/malsapp/react-native-photo-upload/commits?author=omarkhaled11) for providing his original react-native-photo-upload [package](https://github.com/malsapp/react-native-photo-upload). I wanted to make a few improvements to this package and make it a little more production ready.

 - Actually uploads images to a server
 - FormData: faster, more efficient than base64
 - Fetch thumbnails instead of fullsized images on app startup for speed 
 - [Reducks](https://github.com/erikras/ducks-modular-redux)

**Why Redux?**

 - Sharing axios calls between views
 - One place global storage (for image URI, source...)
 - Auto generated dispatch actions by axios middleware (_SUCCESS, _FAIL)
 - Easy logging, tracing actions, etc...
 
## Quickinstallation
```
git clone
npm install
react-native link react-native-image-picker
react-native link react-native-image-resizer
react-native link react-native-fs
```

**For Android and iOS specific setup please refer to this [document](https://github.com/malsapp/react-native-photo-upload)**

**Test Server**
Open new terminal, cd somewhere you feel safe.
```
npm install -g upload-server
mkdir http
http-server start -f http
```

Copy and paste the server URL into Server.js at `export const server = 'yourlocalhost'`

You can now `react-native run-ios`

## TODO

- [ ] Improve component life cycle to display the correct position of image on update
- [ ] Loading animation using fetch
- [ ] Open original image in fullscreen
- [ ] Delete images
- [ ] Better error handling (alerting users what actually happens)
- [ ] Store images on local for faster app startup
