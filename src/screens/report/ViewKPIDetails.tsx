import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import api from '../../services';
import Container from '../../components/Container';
import {COLORS} from '../../theme/colors';
import PLChart from './kpi/PLChart';
import BSChart from './kpi/BSChart';
import OTChart from './kpi/OTChart';

const initialLayout = {width: Dimensions.get('window').width};

const ViewKPIDetails = ({route}) => {
  const {ClientId} = route.params;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'pl', title: 'View PL Data'},
    {key: 'bs', title: 'View BS Data'},
    {key: 'ot', title: 'Other'},
  ]);
  const [kpiData, setKpiData] = useState({PL: '', BS: '', OT: ''});
  console.log(kpiData, 'kpiData');

  useEffect(() => {
    fetchKPIDetails();
  }, []);

  const fetchKPIDetails = async () => {
    try {
      const {data, status} = await api.client.getKPIDetails();
      if (status === 200 && data) {
        console.log(data[0]?.dataValues, 'data');

        setKpiData({
          PL: data[0]?.dataValues[0] || '',
          BS: data[0]?.dataValues[1] || '',
          OT: data[0]?.dataValues[2] || '',
        });
      }
    } catch (error) {
      console.error('Error fetching KPI details:', error);
    }
  };

  const renderScene = SceneMap({
    pl: () => <PLChart dataString={kpiData.PL} />,
    bs: () => <BSChart dataString={kpiData.BS} />,
    ot: () => <OTChart dataString={kpiData.OT} />,
  });

  return (
    <Container
      header={{title: 'KPI Details', backgroundColor: COLORS.primaryColor}}
      goBack={true}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: COLORS.newDark}}
            style={{backgroundColor: 'white'}}
            labelStyle={{color: COLORS.newDark}} // Change label color
            activeColor={COLORS.newDark} // Color for active tab
            inactiveColor={COLORS.grey_shade} // Color for inactive tabs
          />
        )}
      />
    </Container>
  );
};

export default ViewKPIDetails;
