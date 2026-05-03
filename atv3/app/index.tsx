import "../global.css";
import { ScrollView, TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

export default function Index() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#09090b" }}>
      <Box className="flex-1 px-5 pt-16 pb-12">

        {/* Header */}
        <Heading size="2xl" className="text-white mb-1">Gluestack UI</Heading>
        <Text size="sm" className="text-zinc-500 mb-8">playground 🎨</Text>

        {/* Buttons */}
        <Text size="xs" className="text-zinc-400 uppercase tracking-widest mb-3">Botões</Text>
        <VStack space="sm" className="mb-8">
          <Button action="primary" size="lg">
            <ButtonText>Primary</ButtonText>
          </Button>
          <Button action="secondary" size="lg">
            <ButtonText>Secondary</ButtonText>
          </Button>
          <Button action="positive" size="lg">
            <ButtonText>Positive</ButtonText>
          </Button>
          <Button action="negative" size="lg">
            <ButtonText>Negative</ButtonText>
          </Button>
          <Button variant="outline" size="lg">
            <ButtonText>Outline</ButtonText>
          </Button>
          <Button variant="link" size="lg">
            <ButtonText>Link</ButtonText>
          </Button>
        </VStack>

        <Divider className="mb-8 bg-zinc-800" />

        {/* Badges */}
        <Text size="xs" className="text-zinc-400 uppercase tracking-widest mb-3">Badges</Text>
        <HStack space="sm" className="flex-wrap mb-8">
          <Badge action="info" variant="solid">
            <BadgeText>Info</BadgeText>
          </Badge>
          <Badge action="success" variant="solid">
            <BadgeText>Success</BadgeText>
          </Badge>
          <Badge action="warning" variant="solid">
            <BadgeText>Warning</BadgeText>
          </Badge>
          <Badge action="error" variant="solid">
            <BadgeText>Error</BadgeText>
          </Badge>
          <Badge action="muted" variant="outline">
            <BadgeText>Outline</BadgeText>
          </Badge>
        </HStack>

        <Divider className="mb-8 bg-zinc-800" />

        {/* Avatars */}
        <Text size="xs" className="text-zinc-400 uppercase tracking-widest mb-3">Avatars</Text>
        <HStack space="md" className="mb-8 items-center">
          <Avatar size="xs"><AvatarFallbackText>XS</AvatarFallbackText></Avatar>
          <Avatar size="sm"><AvatarFallbackText>SM</AvatarFallbackText></Avatar>
          <Avatar size="md"><AvatarFallbackText>MD</AvatarFallbackText></Avatar>
          <Avatar size="lg"><AvatarFallbackText>LG</AvatarFallbackText></Avatar>
          <Avatar size="xl"><AvatarFallbackText>XL</AvatarFallbackText></Avatar>
        </HStack>

        <Divider className="mb-8 bg-zinc-800" />

        {/* Progress */}
        <Text size="xs" className="text-zinc-400 uppercase tracking-widest mb-3">Progress</Text>
        <VStack space="md" className="mb-8">
          <Progress value={30} size="sm">
            <ProgressFilledTrack />
          </Progress>
          <Progress value={55} size="md">
            <ProgressFilledTrack />
          </Progress>
          <Progress value={80} size="lg">
            <ProgressFilledTrack />
          </Progress>
        </VStack>

        <Divider className="mb-8 bg-zinc-800" />

        {/* Cards */}
        <Text size="xs" className="text-zinc-400 uppercase tracking-widest mb-3">Cards</Text>
        <VStack space="md">
          <Card size="md" variant="outline">
            <Heading size="md" className="mb-1">Card Outline</Heading>
            <Text size="sm" className="text-zinc-400">variant="outline"</Text>
          </Card>

          <Card size="md" variant="filled">
            <Heading size="md" className="mb-1">Card Filled</Heading>
            <Text size="sm" className="text-zinc-400">variant="filled"</Text>
          </Card>

          <Card size="md" variant="elevated">
            <HStack space="md" className="items-center">
              <Avatar size="md">
                <AvatarFallbackText>GL</AvatarFallbackText>
              </Avatar>
              <VStack>
                <Heading size="sm">Gluestack UI</Heading>
                <Text size="xs" className="text-zinc-400">Card com Avatar + HStack</Text>
              </VStack>
            </HStack>
          </Card>
        </VStack>

      </Box>
    </ScrollView>
  );
}