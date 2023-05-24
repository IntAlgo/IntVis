import styles from './vis-network.module.scss';
import classNames from 'classnames';
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";
export interface VisNetworkProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const VisNetwork = ({ className }: VisNetworkProps) => {
    const nodes = [
		{ id: 1, label: "Node 1" },
		{ id: 2, label: "Node 2" },
		{ id: 3, label: "Node 3" },
		{ id: 4, label: "Node 4" },
		{ id: 5, label: "Node 5" },
	];

	const edges = [
		{ from: 1, to: 3 },
		{ from: 1, to: 2 },
		{ from: 2, to: 4 },
		{ from: 2, to: 5 },
		{ from: 3, to: 3 },
	];
    let options={
        layout: {
          randomSeed: undefined,
          improvedLayout: true,
          clusterThreshold: 150,
          hierarchical: {
            enabled: false,
            levelSeparation: 1050,
            nodeSpacing: 1000,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: "UD", // UD, DU, LR, RL
            sortMethod: "directed", // hubsize, directed
            shakeTowards: "leaves", // roots, leaves
          },
        },
        edges: {
          arrows: {
            to: {
              enabled: true,
              type: "arrow",
            },
          },
        },
        interaction: {
          dragNodes: true,
          dragView: true,
          hideEdgesOnDrag: false,
          hideEdgesOnZoom: false,
          hideNodesOnDrag: false,
          hover: true,
          hoverConnectedEdges: true,
          keyboard: {
            enabled: false,
            speed: { x: 10, y: 10, zoom: 0.02 },
            bindToWindow: true,
            autoFocus: true,
          },
          multiselect: false,
          navigationButtons: false,
          selectable: true,
          selectConnectedEdges: true,
          tooltipDelay: 300,
          zoomSpeed: 1,
          zoomView: true,
        },
      };

	const visJsRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const network =
			visJsRef.current &&
			new Network(visJsRef.current, { nodes, edges },options );
		// Use `network` here to configure events, etc
	}, [visJsRef, nodes, edges]);

	return <div ref={visJsRef} />;
};
