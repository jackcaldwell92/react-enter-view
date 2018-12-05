# React Enter View

## Getting Started

These instructions will help you get React Enter View working within an existing or new project.

### Prerequisites

If you don't already have an existing React project that you're working on, you can start one using create-react-app.

```
npx create-react-app react-enter-view-demo
cd react-enter-view-demo
npm start
```

### Installing

To get React Enter View running within your project, install it using npm.

```
npm i react-enter-view
```

## Basic Usage

To use React Enter View within your components, start by importing the 'Monitor' component.

```
import { Monitor } from 'react-enter-view'
```

Next, wrap the component that you want to monitor with the 'Monitor' component.

```
<Monitor>
  <MyComponent>
</Monitor>
```

Now, whenever the component is scrolled into the viewport, the 'onEnterView' callback function will be called. Similarly, whenever the component leaves the view port, the 'onExitView' callback function will be called.

The original intended use for these callbacks is to trigger animations. However, you are free to use them in any way that you please.

```
<Monitor onEnterView={animateMyComponentEntry} onExitView={animateMyComponentExit}>
  <MyComponent>
</Monitor>
```

## Authors

- **Jack Caldwell** - <jackcaldwell92@gmail.com>

See also the list of [contributors](https://github.com/jackcaldwell92/react-enter-view/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Thank you to the React team anybody who uses this.
