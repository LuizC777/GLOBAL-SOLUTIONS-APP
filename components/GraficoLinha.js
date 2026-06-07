import { View, Text } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { cores } from "../constants/tema";

export default function GraficoLinha({ pontos, cor = cores.acento, titulo }) {
  const font = useFont(Inter_500Medium, 11);

  return (
    <View
      style={{
        backgroundColor: cores.superficie,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: cores.borda,
        padding: 12,
        height: 240,
      }}
    >
      {titulo && (
        <Text style={{ color: cores.textoSec, marginBottom: 8, fontSize: 13 }}>
          {titulo}
        </Text>
      )}
      <View style={{ flex: 1 }}>
        {pontos.length < 2 ? (
          <Text style={{ color: cores.textoSec, fontStyle: "italic" }}>
            Coletando dados…
          </Text>
        ) : (
          <CartesianChart
            data={pontos}
            xKey="i"
            yKeys={["valor"]}
            domainPadding={{ top: 20, bottom: 20 }}
            axisOptions={{
              font,
              lineColor: cores.borda,
              labelColor: cores.textoSec,
              formatXLabel: () => "",
            }}
          >
            {({ points }) => (
              <Line
                points={points.valor}
                color={cor}
                strokeWidth={2}
                animate={{ type: "timing", duration: 300 }}
              />
            )}
          </CartesianChart>
        )}
      </View>
    </View>
  );
}
