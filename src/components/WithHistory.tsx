import * as React from "react";

// tslint:disable-next-line:variable-name
export function withHistory(Component: any, history: any) {
    class HOC extends React.Component <any,any> {
        public render() {
            return (
                <Component {...this.props} history={history}/>
            )
        }
    }

    return HOC;
}