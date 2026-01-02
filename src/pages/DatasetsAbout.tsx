import React from "react";

interface ClassDistribution {
  name: string;
  count: number;
  percentage: number;
}

interface DatasetSplit {
  name: string;
  images: number;
  labels: number;
  totalInstances: number;
  classes: ClassDistribution[];
}

interface Dataset {
  title: string;
  imagePath: string;
  splits: DatasetSplit[];
}

const DatasetsAbout = () => {
  const datasets: Dataset[] = [
    {
      title: "Dataset 1 - Radiolucent/Radiopaque Dataset",
      imagePath: "/data1.png",
      splits: [
        {
          name: "TRAIN",
          images: 1661,
          labels: 1661,
          totalInstances: 2018,
          classes: [
            { name: "radiolucent", count: 938, percentage: 46.5 },
            { name: "radiopaque", count: 1080, percentage: 53.5 },
          ],
        },
        {
          name: "VAL",
          images: 353,
          labels: 353,
          totalInstances: 421,
          classes: [
            { name: "radiolucent", count: 185, percentage: 43.9 },
            { name: "radiopaque", count: 236, percentage: 56.1 },
          ],
        },
        {
          name: "TEST",
          images: 357,
          labels: 357,
          totalInstances: 451,
          classes: [
            { name: "radiolucent", count: 206, percentage: 45.7 },
            { name: "radiopaque", count: 245, percentage: 54.3 },
          ],
        },
      ],
    },
    {
      title: "Dataset 2 - Dental Lesion Dataset",
      imagePath: "/datav2.png",
      splits: [
        {
          name: "TRAIN",
          images: 453,
          labels: 453,
          totalInstances: 478,
          classes: [
            { name: "dentigeroz kist", count: 105, percentage: 22.0 },
            { name: "keratokist", count: 87, percentage: 18.2 },
            { name: "radikuler kist", count: 227, percentage: 47.5 },
            { name: "ameloblastoma", count: 24, percentage: 5.0 },
            { name: "odontoma", count: 35, percentage: 7.3 },
          ],
        },
        {
          name: "VAL",
          images: 97,
          labels: 97,
          totalInstances: 104,
          classes: [
            { name: "dentigeroz kist", count: 23, percentage: 22.1 },
            { name: "keratokist", count: 19, percentage: 18.3 },
            { name: "radikuler kist", count: 50, percentage: 48.1 },
            { name: "ameloblastoma", count: 5, percentage: 4.8 },
            { name: "odontoma", count: 7, percentage: 6.7 },
          ],
        },
        {
          name: "TEST",
          images: 98,
          labels: 98,
          totalInstances: 103,
          classes: [
            { name: "dentigeroz kist", count: 24, percentage: 23.3 },
            { name: "keratokist", count: 19, percentage: 18.4 },
            { name: "radikuler kist", count: 48, percentage: 46.6 },
            { name: "ameloblastoma", count: 5, percentage: 4.9 },
            { name: "odontoma", count: 7, percentage: 6.8 },
          ],
        },
      ],
    },
    {
      title: "Dataset 3 - Dental Lesion Dataset Augmented",
      imagePath: "/data_v2_aug.png",
      splits: [
        {
          name: "TRAIN",
          images: 1005,
          labels: 1005,
          totalInstances: 1036,
          classes: [
            { name: "dentigeroz kist", count: 202, percentage: 19.5 },
            { name: "keratokist", count: 201, percentage: 19.4 },
            { name: "radikuler kist", count: 227, percentage: 21.9 },
            { name: "ameloblastoma", count: 200, percentage: 19.3 },
            { name: "odontoma", count: 206, percentage: 19.9 },
          ],
        },
        {
          name: "VAL",
          images: 97,
          labels: 97,
          totalInstances: 104,
          classes: [
            { name: "dentigeroz kist", count: 23, percentage: 22.1 },
            { name: "keratokist", count: 19, percentage: 18.3 },
            { name: "radikuler kist", count: 50, percentage: 48.1 },
            { name: "ameloblastoma", count: 5, percentage: 4.8 },
            { name: "odontoma", count: 7, percentage: 6.7 },
          ],
        },
        {
          name: "TEST",
          images: 98,
          labels: 98,
          totalInstances: 103,
          classes: [
            { name: "dentigeroz kist", count: 24, percentage: 23.3 },
            { name: "keratokist", count: 19, percentage: 18.4 },
            { name: "radikuler kist", count: 48, percentage: 46.6 },
            { name: "ameloblastoma", count: 5, percentage: 4.9 },
            { name: "odontoma", count: 7, percentage: 6.8 },
          ],
        },
      ],
    },
  ];

  const renderSplit = (split: DatasetSplit) => {
    return (
      <div className="mb-6">
        <div className="text-green-600 font-semibold mb-2">
          {split.name} Set:
        </div>
        <div className="ml-4">
          <div>Images: {split.images}</div>
          <div>Labels: {split.labels}</div>
          <div>Total instances: {split.totalInstances}</div>
          <div className="mt-2">Classes distribution:</div>
          <div className="ml-4">
            {split.classes.map((cls, idx) => (
              <div key={idx}>
                {cls.name.padEnd(20)} : {cls.count.toString().padStart(4)} (
                {cls.percentage.toFixed(1).padStart(5)}%)
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 mx-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Datasets About
        </h1>

        {datasets.map((dataset, idx) => (
          <div key={idx} className="mb-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 border-b-2 border-blue-200 pb-3">
              {dataset.title}
            </h2>

            {/* Statistics Section */}
            <div className="mb-8">
              <pre className="font-mono text-sm bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto">
                {
                  "======================================================================\n"
                }
                {"📊 Dataset Statistics\n"}
                {
                  "======================================================================\n\n"
                }
                {dataset.splits.map((split, splitIdx) => (
                  <React.Fragment key={splitIdx}>
                    {split.name} Set:{"\n"}
                    {"  "}Images: {split.images}
                    {"\n"}
                    {"  "}Labels: {split.labels}
                    {"\n"}
                    {"  "}Total instances: {split.totalInstances}
                    {"\n"}
                    {"  "}Classes distribution:{"\n"}
                    {split.classes.map((cls, clsIdx) => (
                      <React.Fragment key={clsIdx}>
                        {"    "}
                        {cls.name.padEnd(20)} :{" "}
                        {cls.count.toString().padStart(4)} (
                        {cls.percentage.toFixed(1).padStart(5)}%){"\n"}
                      </React.Fragment>
                    ))}
                    {splitIdx < dataset.splits.length - 1 && "\n"}
                  </React.Fragment>
                ))}
              </pre>
            </div>

            {/* Charts Section */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
              <img
                src={dataset.imagePath}
                alt={`${dataset.title} Charts`}
                className="w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"%3E%3Crect width="1200" height="400" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%236b7280" text-anchor="middle" dominant-baseline="middle"%3EChart Image Not Found%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatasetsAbout;
