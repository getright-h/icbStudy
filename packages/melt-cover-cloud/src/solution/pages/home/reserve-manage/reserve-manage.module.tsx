import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { reserveManageRoutes } from './reserve-manage.routes';

const ReserveManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(reserveManageRoutes)}</React.Fragment>;
};

export default ReserveManageModule;
