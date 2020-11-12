declare module 'k3s-deployment' {
  export interface Labels {
    app: string;
    deployment: string;
  }

  export interface Metadata {
    name: string;
    namespace: string;
    labels: Labels;
  }

  export interface MatchLabels {
    'workload.user.cattle.io/workloadselector': string;
  }

  export interface Selector {
    matchLabels: MatchLabels;
  }

  export interface Annotations {
    app: string;
    pod: string;
  }

  export interface Labels2 {
    app: string;
    pod: string;
    'workload.user.cattle.io/workloadselector': string;
  }

  export interface Metadata2 {
    annotations: Annotations;
    labels: Labels2;
  }

  export interface ConfigMapKeyRef {
    key: string;
    name: string;
    optional: boolean;
  }

  export interface ValueFrom {
    configMapKeyRef: ConfigMapKeyRef;
  }

  export interface Env {
    name: string;
    value: string;
    valueFrom: ValueFrom;
  }

  export interface Container {
    name: string;
    image: string;
    env: Env[];
    imagePullPolicy: string;
    resources?: any;
  }

  export interface Spec2 {
    containers: Container[];
    dnsPolicy: string;
    hostname: string;
    restartPolicy: string;
    schedulerName: string;
    terminationGracePeriodSeconds: number;
  }

  export interface Template {
    metadata: Metadata2;
    spec: Spec2;
  }

  export interface Spec {
    replicas: number;
    selector: Selector;
    template: Template;
  }

  export interface Deployment {
    apiVersion: string;
    kind: string;
    metadata: Metadata;
    spec: Spec;
  }
}
