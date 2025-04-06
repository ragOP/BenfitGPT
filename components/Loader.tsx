import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';

interface LoaderProps {
  isAlreadyQualified: boolean;
}

const Loader:React.FC<LoaderProps> = ({isAlreadyQualified}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.Text style={[styles.title, {transform: [{scale: scaleAnim}]}]}>
      {isAlreadyQualified ? "Already qualified, redirecting...": "Let's Start..."}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
    width: '90%',
  },
});

export default Loader;
