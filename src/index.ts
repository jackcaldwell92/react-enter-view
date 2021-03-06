import * as React from 'react';

interface IProps {
  onEnterView: () => void;
  onExitView: () => void;
}

export class Monitor extends React.Component<IProps> {
  public static defaultProps = {
    onEnterView: () => null,
    onExitView: () => null,
  };

  private inView = false;

  private childrenRef = React.createRef<HTMLDivElement>();

  private children = React.cloneElement(
    this.props.children as React.ReactElement<any>,
    {
      ref: this.childrenRef,
    },
  );

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // Check if child node is already in view.
    const inView = this.checkInView();
    if (inView) {
      this.setState({ inView: true });
      this.props.onEnterView();
    }
  }

  public render() {
    return this.children;
  }

  private handleScroll = () => {
    const newInView = this.checkInView();
    if (newInView !== this.inView) {
      this.inView = newInView;
      if (newInView) {
        this.props.onEnterView();
      } else {
        this.props.onExitView();
      }
    }
  };

  private checkInView = () => {
    if (this.childrenRef.current) {
      if (
        window.scrollY + window.innerHeight >
          this.childrenRef.current.offsetTop &&
        window.scrollX + window.innerWidth >
          this.childrenRef.current.offsetLeft &&
        this.childrenRef.current.offsetTop +
          this.childrenRef.current.getBoundingClientRect().height >
          window.scrollY &&
        this.childrenRef.current.offsetLeft +
          this.childrenRef.current.getBoundingClientRect().width >
          window.scrollX
      ) {
        return true;
      }
    }
    return false;
  };
}
