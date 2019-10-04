import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { message } from 'antd';

import './css/App.css';
import AnalysisList from './AnalysisList';
import AnalysisBuilder from './analysis_builder/Builder';
import { AppState } from './coretypes';
import { config } from './config';
import FAQ from './FAQ';
import { NotFound } from './HelperComponents';
import Home from './Home';
import Ingest from './Ingest';

const isBlimp = (config.blimp === 'true');
import { PredictorCollectionList } from './predictor_collection/CollectionList';

export default class Routes extends React.Component<AppState, {}> {
  render() {
    return (
      <Switch>
        <Route
          exact={true}
          path="/"
          render={props =>
            <Home />
           }
        />
        <Route
          exact={true}
          path="/builder"
          render={props => {
            // This is a temporary solution to prevent non logged-in users from entering the builder.
            // Longer term to automatically redirect the user to the target URL after login we
            // need to implement something like the auth workflow example here:
            // https://reacttraining.com/react-router/web/example/auth-workflow
            if (this.props.auth.loggedIn || this.props.auth.openLogin) {
              return <AnalysisBuilder
                        updatedAnalysis={() => this.props.loadAnalyses()}
                        key={props.location.key}
                        datasets={this.props.datasets}
                        doTour={this.props.auth.openTour} 
              />;
            }
            message.warning('Please log in first and try again');
            return <Redirect to="/" />;
          }}
        />
        <Route
          path="/builder/:id"
          render={props =>
            <AnalysisBuilder
              id={props.match.params.id}
              updatedAnalysis={() => this.props.loadAnalyses()}
              userOwns={this.props.analyses.filter((x) => x.id === props.match.params.id).length > 0}
              datasets={this.props.datasets}
              doTooltip={true}
            />}
        />
        <Route
          exact={true}
          path="/public/:id"
          render={props =>
            <AnalysisBuilder
              id={props.match.params.id}
              updatedAnalysis={() => this.props.loadAnalyses()}
              userOwns={this.props.analyses.filter((x) => x.id === props.match.params.id).length > 0}
              datasets={this.props.datasets}
              doTooltip={true}
            />
          }
        />
      <Route
        exact={true}
        path="/public"
        render={props =>
          <AnalysisList
            analyses={this.props.publicAnalyses}
            cloneAnalysis={this.props.cloneAnalysis}
            datasets={this.props.datasets}
            publicList={true}
          />}
      />
      <Route
        exact={true}
        path="/myanalyses"
        render={props =>
          <AnalysisList
            analyses={this.props.analyses}
            cloneAnalysis={this.props.cloneAnalysis}
            onDelete={this.props.onDelete}
            datasets={this.props.datasets}
            publicList={false}
          />}
      />
      { isBlimp &&
        <Route
          path="/ingest"
          render={props =>
            <Ingest getDatasets={this.props.getDatasets} />
          }
        />
      }
      <Route
        exact={true}
        path="/faq"
        render={() => <FAQ/>}
      />
      <Route
        path="/mycollections"
        render={props =>
          <PredictorCollectionList
            datasets={this.props.datasets}
            collections={this.props.auth.predictorCollections}
          />}
      />
      <Route component={NotFound} />
      </Switch>
    );
  }
}
