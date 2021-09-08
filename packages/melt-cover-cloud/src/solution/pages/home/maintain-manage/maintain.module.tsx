import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { maintainRoutes } from './maintain.routes';

const MaintainModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(maintainRoutes)}</React.Fragment>;
};

export default MaintainModule;
