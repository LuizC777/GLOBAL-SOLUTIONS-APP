import { Tabs, useRouter } from "expo-router";
import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "../../constants/tema";
import { useMissao } from "../../context/MissaoContext";

function BotaoAlertas() {
  const router = useRouter();
  const { alertas } = useMissao();
  return (
    <Pressable
      onPress={() => router.push("/alertas")}
      style={{ marginRight: 16 }}
    >
      <Ionicons name="notifications" size={22} color={cores.texto} />
      {alertas.length > 0 && (
        <View style={s.badge}>
          <Text style={s.badgeTexto}>{alertas.length}</Text>
        </View>
      )}
    </Pressable>
  );
}

export default function LayoutAbas() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: cores.superficie },
        headerTintColor: cores.texto,
        headerRight: () => <BotaoAlertas />,
        tabBarStyle: {
          backgroundColor: cores.superficie,
          borderTopColor: cores.borda,
        },
        tabBarActiveTintColor: cores.acento,
        tabBarInactiveTintColor: cores.textoSec,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Visão geral",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="planet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="telemetria"
        options={{
          title: "Telemetria",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="thermometer" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="energia"
        options={{
          title: "Energia",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="battery-charging" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="comunicacao"
        options={{
          title: "Comunicação",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="radio" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Config",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const s = {
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: cores.critico,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeTexto: { color: "#fff", fontSize: 11, fontWeight: "700" },
};
