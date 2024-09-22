import React from 'react';
import DetailHeader from '@/src/common/headers/DetailHeader';
import TabHeader from '@/src/common/headers/TabHeader';

interface HeaderProps {
  routeName: string;
  routeMap: {
    // @ts-ignore
    [routeName: string]: string;
  };
  title: string;
}

export default function CommonHeader({routeName, routeMap, title}: HeaderProps) {
  return Object.keys(routeMap).includes(routeName) ? (
    <DetailHeader title={routeMap[routeName]} />
  ) : (
    <TabHeader title={title} />
  );
}
