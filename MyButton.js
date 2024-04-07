import { Button, StyleSheet, Platform } from "react-native-web";

export default function MyButton(){
    const styles = StyleSheet.create(
        {
            flex : 1,
            ...Platform.select({
            contenair: {
                ios : {
                    backgroundColor : "blue"
                },
                android: {
                    backgroundColor : "green"
                },
                default: {
                    backgroundColor: "gray"
                }
            }
        })
        });
        return <Button style={styles.contenair.backgroundColor} title="Submit"/>
}
