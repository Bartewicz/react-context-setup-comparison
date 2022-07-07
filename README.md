# React Context API setup comparison

This project presents how setting up a `React.Context` within your app can affect performance.

In the app you can find two nested apps composed in two different manners. First (on the left) is the app composed in typical manner, where you setup app's `state` and call `AppContext.Provider` directly in your `App` component. The latter wraps `AppContext.Provider` within the separate component and setups the initial state there.

Using the wrapper built around `AppContext.Provider` in your `App` as any other component increases the performance of the app **tremendously**.

## Test yourself

To test, in the project directory, you need to run:

### Setup demo app

#### `npm i`

This install all the project's dependencies, which is requried before you use it.

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Preview

Make sure you have React Development Tools installed in your browser and open one of those tabs (either _Components_ or _Profiler_) in the Developer Tools in your browser. Within the tab find the settings menu with the ⚙️ icon, make sure the options _Highlight updates when components render._ is enabled.

Now, whenever any of the components in the app re-renders, you will notice it is highlighted by your browser. Play around by clicking **Shuffle!** buttons to see the differences in rendering both apps by react due to just `React.Context` composition.
